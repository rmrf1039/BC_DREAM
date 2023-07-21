import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { IconButton, PixelIcon, Spacer, Text } from 'nes-ui-react';
import { useState } from "react";

function BackLink() {
  const navigate = useNavigate();

  return (
    <Link onClick={() => navigate(-1)}>
      <div className="d-inline-block">
        <IconButton color="error">
          <PixelIcon inverted name="pixelicon-close" size="small" className="me-2" />
          <Text size="medium">Back</Text>
        </IconButton>
      </div>
    </Link>
  );
}

export default function Menu() {
  const { pathname } = useLocation();
  const back = ![
    '',
    '/',
    '/register',
    '/profile',
    '/bag',
    '/market',
    '/exercise',
    '/exercise/realtime',
    '/coupon',
  ].includes(pathname) //The path that should not have BackLink

  const [isExpanded, setIsExpanded] = useState(0);

  const NavReLink = ({ title, path }) => {
    return (
      <NavLink className="nav-link d-inline-flex" to={path} onClick={() => setIsExpanded(0)}>
        <Text size="large">{title}</Text>
      </NavLink>
    )
  }

  //${!props.isMenuVisible && 'd-none'}
  return (
    <Navbar
      expand="lg"
      className={`p-3`}
      expanded={isExpanded}
      onToggle={b => setIsExpanded(b ? 1 : 0)}
    >
      {back && !isExpanded ? <BackLink /> : <Spacer />}
      <Navbar.Toggle aria-controls="basic-navbar-nav" as="div">
        <IconButton color="primary" className="m-0">
          <span className="material-symbols-sharp">
            {isExpanded ? 'close' : 'menu'}
          </span>
        </IconButton>
      </Navbar.Toggle>

      <Navbar.Collapse id="nav-body" className={`${!isExpanded ? 'invisible' : 'vh-100'} bg-light`}>
        <Nav className="mt-3">
          <NavReLink icon="home" title="Home" path="/" />
          <NavReLink icon="backpack" title="Backpack" path="/bag" />
          <NavReLink icon="storefront" title="Market" path="/market" />
          <NavReLink icon="confirmation_number" title="My Coupon" path="/coupon" />
          <NavReLink icon="account_circle" title="Profile" path="/profile" />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
import { Link, NavLink, useNavigate } from "react-router-dom";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { IconButton, PixelIcon, Spacer, Heading, Text } from 'nes-ui-react';
import { useState } from "react";

function BackLink() {
  const navigate = useNavigate();

  return (
    <Link onClick={() => navigate(-1)}>
      <div className="d-inline-block">
        <IconButton color="error">
          <PixelIcon inverted name="pixelicon-close" size="small" className="me-2" />
          <Text size="small">返回</Text>
        </IconButton>
      </div>
    </Link>
  );
}

export default function Menu({ state = {} }) {
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
      className={`p-3 pb-0 mb-3`}
      expanded={isExpanded}
      onToggle={b => setIsExpanded(b ? 1 : 0)}
      style={{
        backgroundColor:isExpanded ? '#fff' : 'transparent',
      }}
    >
      {
        !isExpanded
        ?
          <>
            { state.isShowBack && <BackLink /> }
            { state.title && <Heading dense size='large' className="p-0">{ state.title.toUpperCase() }</Heading> }
          </>
        :
        <Spacer />
      }
      <Spacer />
      {
        state.isShowMenu &&
        <Navbar.Toggle aria-controls="basic-navbar-nav" as="div">
          <IconButton color="darkGray" className="m-0">
            <span className="material-symbols-sharp">
              {isExpanded ? 'close' : 'menu'}
            </span>
          </IconButton>
        </Navbar.Toggle>
      }

      <Navbar.Collapse id="nav-body" className={`${!isExpanded ? 'invisible' : 'vh-100'}`}>
        <Nav className="mt-3">
          <NavReLink icon="home" title="主頁" path="/" />
          <NavReLink icon="backpack" title="背包" path="/bag" />
          <NavReLink icon="storefront" title="市場" path="/market" />
          <NavReLink icon="confirmation_number" title="優惠券" path="/coupon" />
          <NavReLink icon="account_circle" title="帳戶" path="/profile" />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
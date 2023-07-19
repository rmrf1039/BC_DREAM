import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

import Menu from '../components/Menu';
import { IconButton, PixelIcon, Text } from 'nes-ui-react';

function BackLink() {
  const navigate = useNavigate();

  return (
    <Link onClick={() => navigate(-1)}>
      <div className="ps-3 pe-3 d-inline-block">
        <IconButton color="error">
          <PixelIcon inverted name="pixelicon-close" size='small' className="me-1" />
          <Text size='small'>Back</Text>
        </IconButton>
      </div>
    </Link>
  );
}

const Layout = (props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
  ].includes(pathname)

  return (
    <>
      <div className="vh-100 pt-3">
        {back && <BackLink />}
        <Outlet />
      </div>
      <Menu isMenuVisible={props.isMenuVisible } />
    </>
  );
}

export default Layout;

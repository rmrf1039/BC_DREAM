import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

import Menu from '../components/Menu';
import Button from 'react-bootstrap/Button';

function BackLink() {
  const navigate = useNavigate();

  return (
    <Link onClick={() => navigate(-1)}>
      <div className="p-3 d-inline-block">
        <Button variant="transparent" className="p-0 text-light d-flex align-items-center">
          <span className="material-symbols-sharp me-2">arrow_back</span>
          <span>Back</span>
        </Button>
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
      <div className="vh-100 bg-bgBlue">
        {back && <BackLink />}
        <Outlet />
      </div>
      <Menu isMenuVisible={props.isMenuVisible} />
    </>
  );
}

export default Layout;

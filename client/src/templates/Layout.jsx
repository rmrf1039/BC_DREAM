import { Outlet} from "react-router-dom";

import Menu from '../components/Menu';

const Layout = () => {
  return (
    <div className="vh-100 vw-100">
      <Menu />
      <Outlet />
    </div>
  );
}

export default Layout;

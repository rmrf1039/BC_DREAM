import { Outlet} from "react-router-dom";

import Menu from '../components/Menu';

const Layout = ({ disableMenu = false }) => {
  return (
    <div className={`background vh-100 vw-100 ${disableMenu && 'pt-3'}`}>
      {
        !disableMenu && <Menu />
      }
      <Outlet />
    </div>
  );
}

export default Layout;

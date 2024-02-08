import { Outlet } from "react-router-dom";

import Menu from '../components/Menu';

const Layout = ({ state = {}, dispatch = null }) => {
  return (
    <div
      style={{
        backgroundColor: state.backgroundColor,
        backgroundImage: state.backgroundImage,
        backgroundSize: state.backgroundSize,
        backgroundPositionY: state.backgroundPositionY,
      }}
      className={`background vh-100 vw-100 ${(!state.isShowMenu && !state.title && !state.isShowBack) && 'pt-3'}`}
    >
      <Menu state={state} />
      <Outlet />
    </div>
  );
}

export default Layout;

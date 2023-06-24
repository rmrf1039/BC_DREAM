import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

import Menu from '../components/Menu';

const Layout = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    
    const back = !['/', '/exercise/realtime'].includes(pathname)

    return (
        <>
            <div className="container p-5">
                {back && <Link onClick={() => navigate(-1)}>Back</Link>}
                <div className="layout">
                    
                </div >
                <div className="block" >
                    <Outlet />
                </div>
            </div>

            <Menu />
        </>
    );
}

export default Layout;

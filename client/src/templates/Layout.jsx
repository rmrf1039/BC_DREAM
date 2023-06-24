import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";


const Layout = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const back = !['/', '/exercise/realtime'].includes(pathname)

    return (
        <>
            {back && <Link onClick={() => navigate(-1)}>Back</Link>}
            <div className="layout">
                
            </div >
            <div className="block" >
                <Outlet />
            </div>
        </>
    );
}

export default Layout;

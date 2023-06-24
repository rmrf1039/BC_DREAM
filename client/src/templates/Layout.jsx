import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";


const Layout = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const back = !['/', '/exercise/realtime'].includes(pathname)

    return (
        <>
            {back && <Link onClick={() => navigate(-1)}>Back</Link>}
            <div className="layout">
                <h2>Layout</h2>
            </div >
            <div className="block" >
                <Outlet />
            </div>
        </>
    );
}

export default Layout;

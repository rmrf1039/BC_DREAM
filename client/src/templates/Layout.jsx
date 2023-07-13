import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

import Menu from '../components/Menu';

function BackLink () {
    const navigate = useNavigate();

    return (
        <Link onClick={() => navigate(-1)}>
            <button type="button" className="btn btn-dark text-light">
                <span className="material-icons">arrow_back</span>
                <span>Back</span>
            </button>
        </Link>
    );
}

const Layout = (props) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    
    const back = !['/',  '/register', '/bag', '/market', '', '/exercise/realtime'].includes(pathname)

    return (
        <>
            <div className="vh-100 bg-bgBlue">
                {back && <BackLink> </BackLink>}
                <div className="layout">

                </div >
                <div className="block" >
                    <Outlet />
                </div>
            </div>

            <Menu isMenuVisible={props.isMenuVisible} />
        </>
    );
}

export default Layout;

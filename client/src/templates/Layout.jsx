import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

import Menu from '../components/Menu';

function BackLink () {
    const navigate = useNavigate();

    return (
        <Link onClick={() => navigate(-1)}>
            <div className="p-3 d-inline-block">
                <button type="button" className="p-0 btn btn-transparent text-light d-flex align-items-center">
                    <span className="material-symbols-sharp me-2">arrow_back</span>
                    <span>Back</span>
                </button>
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
        '/bag',
        '/market',
        '/exercise/realtime'
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

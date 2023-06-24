import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <>
            <div className="layout">
                <h2>AuthLayout</h2>
            </div >
            <div className="block" >
                <Outlet />
            </div>
        </>
    );
}

export default AuthLayout;

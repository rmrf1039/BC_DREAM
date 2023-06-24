import { Link } from "react-router-dom";
const Login = () => {
    return (
        <div>
            <h1>Login</h1>
            <ul>
                <li><Link to="/register">register</Link></li>
                <li><Link to="/">home</Link></li>
            </ul>

        </div>
    );
}

export default Login;

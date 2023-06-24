import { Link } from "react-router-dom";

const Profile = () => {
    return (
        <div>
            <h1>Profile</h1>
            <li><Link to="/login">logout</Link></li>
        </div>
    );
}

export default Profile;

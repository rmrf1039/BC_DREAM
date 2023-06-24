import { Link } from "react-router-dom";
const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <ul>
                <li><Link to='/register'>register</Link></li>
                <li><Link to='/bag'>bag</Link></li>
                <li><Link to='/market'>market</Link></li>
                <li><Link to='/exercise'>exercise</Link></li>
                <li><Link to='/coupon'>coupon</Link></li>
                <li><Link to='/profile'>profile</Link></li>
            </ul>
        </div>
    );
}

export default Home;

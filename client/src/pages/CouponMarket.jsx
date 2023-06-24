import { Link } from "react-router-dom";

const CouponMarket = () => {
    return (
        <>
            <div>
                <h1>CouponMarket</h1>
                <ul>
                    <li><Link to="exchange">exchange</Link></li>
                    <li><Link to="keeper">keeper</Link></li>
                </ul>
            </div>


        </>
    );
}

export default CouponMarket;

import { useEffect } from 'react';
import { Link } from "react-router-dom";

const CouponMarket = (props) => {
    useEffect(() => {
        props.setIsMenuVisible(1);
    });
    
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

import { useEffect } from 'react';

const CouponExchange = (props) => {
    useEffect(() => {
        props.setIsMenuVisible(0);
    });

    return (
        <div>
            <h1>CouponExchange</h1>
        </div>
    );
}

export default CouponExchange;

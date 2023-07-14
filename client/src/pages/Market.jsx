import { useEffect } from 'react';
import { useLocation } from "react-router-dom";

const Market = (props) => {
    useEffect(() => {
        props.setIsMenuVisible(1);
    });

    console.log(useLocation())
    return (
        <div>
            <h1>Market</h1>
        </div>
    );
}

export default Market;

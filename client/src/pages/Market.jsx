import { useLocation } from "react-router-dom";

const Market = () => {
    console.log(useLocation())
    return (
        <div>
            <h1>Market</h1>
        </div>
    );
}

export default Market;

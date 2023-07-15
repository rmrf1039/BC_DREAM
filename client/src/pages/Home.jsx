import { useEffect } from 'react';
import { Link } from "react-router-dom";

const Home = (props) => {
    useEffect(() => {
        props.setIsMenuVisible(1);
    });

    return (
        <header >
            <h1 className="text-light">Hi! <span className="text-primary">CYLU</span>,</h1>
            <h1 className="text-light">Welcome to the GYM!</h1>
        </header>
    );
}

export default Home;


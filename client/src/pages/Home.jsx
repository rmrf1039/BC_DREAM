import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { useListingWear } from '../contracts/WearContract';

const Home = (props) => {
  useEffect(() => {
    props.setIsMenuVisible(1);
  });

  return (
    <header >
      <h1>Hi! <span className="text-primary">CYLU</span>,</h1>
      <hr></hr>
    </header>
  );
}

export default Home;


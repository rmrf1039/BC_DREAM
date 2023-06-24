import React, { useEffect } from 'react'
import { useEth } from "./contexts/EthContext/EthProvider";
//import Demo from "./components/Demo"; <Demo />

export default function App() {
  const ethService = useEth();

  useEffect(() => {
    console.log(ethService.state);
  }, [ethService, ethService.state]);

  return (
    <div id="App">
      <div className="container">
        <h1>Hello Block Chain:</h1>
        <p>address: { ethService.state.accounts }</p>
      </div>
    </div>
  );
}

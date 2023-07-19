import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';

import App from "./App";
import { WagmiProvider } from "./providers/WagmiProvider";

import './assets/scss/app.scss';

const root = ReactDOM.createRoot(document.getElementById("root"));

// Service registry: 
// 1. Ｗeb3
// 2. Router
root.render(
  <React.StrictMode>
    <WagmiProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WagmiProvider>
  </React.StrictMode>
);

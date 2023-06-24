import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';

import App from "./App";
import { EthProvider } from "./contexts/EthContext/EthProvider";

import './assets/scss/app.scss';

const root = ReactDOM.createRoot(document.getElementById("root"));

// Service registry: 
// 1. Ｗeb3
// 2. Router
root.render(
  <React.StrictMode>
    <EthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </EthProvider>
  </React.StrictMode>
);

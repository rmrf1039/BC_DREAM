import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import App from "./App";
import { WagmiProvider } from "./providers/WagmiProvider";
import { AxiosProvider } from "./providers/AxiosProvider";
import { CookiesProvider } from 'react-cookie';

import './assets/scss/app.scss';

const root = ReactDOM.createRoot(document.getElementById("root"));

// Service registry: 
// 1. Ｗeb3
// 2. Router
root.render(
  <WagmiProvider>
    <CookiesProvider>
      <AxiosProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AxiosProvider>
    </CookiesProvider>
  </WagmiProvider>
);

/**
 * React.StrictMode causes double rendering, so it has been removed
 * <React.StrictMode>
    
  </React.StrictMode>
 */

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
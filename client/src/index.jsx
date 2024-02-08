import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import App from "./App";
import { WagmiProvider } from "./providers/WagmiProvider";
import { AxiosProvider } from "./providers/AxiosProvider";
import { MsgProvider } from "./providers/MsgProvider";
import { CookiesProvider } from 'react-cookie';

import './assets/scss/app.scss';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <WagmiProvider>
    <CookiesProvider>
      <AxiosProvider>
        <MsgProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MsgProvider>
      </AxiosProvider>
    </CookiesProvider>
  </WagmiProvider>
);

serviceWorkerRegistration.register();
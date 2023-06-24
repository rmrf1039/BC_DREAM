import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';

import { EthProvider } from "./contexts/EthContext/EthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <EthProvider>
      <App />
    </EthProvider>
  </React.StrictMode>
);

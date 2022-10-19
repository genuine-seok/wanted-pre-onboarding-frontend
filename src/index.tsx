import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { LoginContextProvider } from "./contexts/LoginContext";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <LoginContextProvider>
    <React.StrictMode>
      <Router basename={process.env.PUBLIC_URL}>
        <App />
      </Router>
    </React.StrictMode>
  </LoginContextProvider>
);

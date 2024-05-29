import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import Store from "../Store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
let clientId =
  "1045795584807-hj1qc8fcgsqd20seip2hsc8jci5rk9uk.apps.googleusercontent.com";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={Store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

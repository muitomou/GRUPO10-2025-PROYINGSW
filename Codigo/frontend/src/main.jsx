import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Importa BrowserRouter
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa Bootstrap aquí
import './i18n';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter> {/* Envuelve tu aplicación en BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { TransactionsProvider } from "./Context/TransactionsContext";
import AuthProvider from "./Context/AuthContext";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TransactionsProvider>
          <App />
        </TransactionsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

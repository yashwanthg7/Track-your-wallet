import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { TransactionsProvider } from './Context/TransactionsContext';
import AuthProvider from './Context/AuthContext';

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <TransactionsProvider>
        <App>
        </App>
      </TransactionsProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { TransactionsProvider } from './Context/TransactionsContext';

ReactDOM.render(
  <BrowserRouter>
    <TransactionsProvider>
        <App>
        </App>
    </TransactionsProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

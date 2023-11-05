import React from 'react';
import ReactDOM from 'react-dom/client';
import AppState from './context/State';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppState>
    <App />
    </AppState>
  </React.StrictMode>
);
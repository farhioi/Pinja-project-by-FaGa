import React from 'react';
import ReactDOM from 'react-dom/client';  // React 18:n uusi API
import './index.css';  // Yleinen tyylitiedosto
import App from './App';  // Sovelluksen pääkomponentti

const root = ReactDOM.createRoot(document.getElementById('root'));  // Haetaan HTML:stä id="root"
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

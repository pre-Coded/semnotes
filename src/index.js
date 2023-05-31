import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css'
import { FireBaseProvider } from './utilities/Firebase';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FireBaseProvider>
        <App/>
      </FireBaseProvider>
    </BrowserRouter>
  </React.StrictMode>
);


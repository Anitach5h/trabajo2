import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter
import { App } from './App'; // Importa tu componente principal

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter> {/* Envuelve tu App con BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

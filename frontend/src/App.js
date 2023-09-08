import React from "react";
import "./App.css"
import Login from "./componentes/Login";
import ContraseñaOlvidada from "./componentes/ContraseñaOlvidada";
import Benja from "./componentes/Benja";
import { Routes, Route } from 'react-router-dom';

export function App() {
  return (
      <div>
       <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/contraseña-olvidada" element={<ContraseñaOlvidada />} />
  <Route path="/benja" element={<Benja />} />
  </Routes>
    </div>
  )
}

import React from "react";
import { Routes, Route } from 'react-router-dom';
import "./App.css";

import Login from "./componentes/Login";
import ContraseñaOlvidada from "./componentes/ContraseñaOlvidada";
import Benja from "./componentes/Benja";
import Sigin from "./componentes/Sigin";

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/Sigin" element={<Sigin />} />
        <Route path="/" element={<Login />} />
        <Route path="/contraseña-olvidada" element={<ContraseñaOlvidada />} />
        <Route path="/benja" element={<Benja />} />
      </Routes>
    </div>
  );
}


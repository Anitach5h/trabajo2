import React, { useState } from 'react';
import "../hojas-de-estilos/Login.css";
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    console.log('Correo:', correo);
    console.log('Contraseña:', contraseña);

    if (correo === 'admin' && contraseña === 'admin') {
      navigate('/benja');
    } else {
      alert('Inicio de sesión fallido. Verifica tus credenciales.');
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLoginClick();
    }
  }

  const toggleMostrarContraseña = () => {
    setMostrarContraseña(!mostrarContraseña);
  }

  return (
    <div>
      <header className="encabezado">
        <nav className="barra-navegador">
          <a href="/">Inicio</a>
          <a href="/">Acerca De...</a>
          <a href="/">Servicios</a>
          <a href="/">Contacto</a>
        </nav>
        <div className="buscar">
          <input type="text" placeholder="Buscar..." />
          <i className="lupa"></i>
        </div>
      </header>
      <div className="fondo"></div>
      <section className="inicio">
        <div className="contenido">
          <a href="/" className="Logo">¡Hola!</a>
          <h2>¡Bienvenido!</h2>
          <h3>A Nuestro Sitio Web</h3>
          <p>Hola!, eres nuevo por aquí?. Genial te explico de qué trata nuestra página web! Nuestra
            página sirve para que coloques tus tareas pendientes y cada vez que inicies sesión, podrás
            visualizar qué tareas tienes pendientes y cuáles todavía no están hechas, mostrando el tiempo
            transcurrido desde que creaste la tarea.</p>
        </div>
        <div className="loguearse">
          <h2>Acceder</h2>
          <div className="entrada">
            <input
              type="text"
              className="input1"
              placeholder="Correo"
              required
              onChange={(e) => setCorreo(e.target.value)}
              onKeyDown={handleKeyDown} // Controlador de evento para "Enter"
            />
          </div>

          <div className="entrada">
            <input
              type={mostrarContraseña ? 'text' : 'password'}
              className="input1"
              placeholder="Contraseña"
              required
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              onKeyDown={handleKeyDown} // Controlador de evento para "Enter"
            />
            <div className='caja-del-boton'>
              <div onClick={toggleMostrarContraseña} className="boton-secundario">
                {mostrarContraseña ? "Ocultar Contraseña" : "Mostrar Contraseña"}
              </div>
            </div>
          </div>
          <div className="controlar">
            <label><input type="checkbox" />Recordar mi nombre de usuario</label>
          </div>
          <div className='pregunta'>
            <Link to="/contraseña-olvidada" className='link'>¿Has olvidado tu contraseña?</Link>
          </div>
          <div className="boton">
            <button className="btn" onClick={handleLoginClick}>Iniciar Sesión</button>
          </div>
          <div className="registrate">
            <p>No tengo una cuenta...</p>
            <Link to="/registro">Registrarte Aquí</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
import React from "react";
import "../hojas-de-estilos/ContraseñaOlvidada.css";

function ContraseñaOlvidada() {
  return (
    <div className="contenedor principal">
      <div>
        <header className="encabezado1">
          <nav className="barra-navegador1">
            <a href="/">Inicio</a>
            <a href="/">Acerca De...</a>
            <a href="/">Servicios</a>
            <a href="/">Contacto</a>
          </nav>
          <div className="buscar1">
            <input type="text" placeholder="Buscar..." />
            <i className="lupa1"></i>
          </div>
        </header>
      </div>
      <div className="fondo1"></div>
      <section className="inicio1">
        <div className="contenido1">
          <a href="/" className="Logo1">¡Hola!</a>
          <h2>¿Has olvidado tu Contraseña?</h2>
          <h3>No te preocupes, Aqui vas a Poder Recuperar Tu Contraseña!</h3>
          <p>Si no tenes acceso al correo con el que te registraste u otro tipo de problema con el acceso a tu correo, contactate con el Soporte de Nuestra Pagina Web </p>
        </div>
        <div className="recuperar">
          <h2>Recuperar Contraseña</h2>
          <div className="entrada1">
            <input type="text" className="input2" placeholder="Correo con el que te Registraste" required />
            <a href="/">Contactar con el Soporte</a>
          </div>
          <div className="boton1">
            <button className="btn1">Recuperar</button>
          </div>
        </div>
      </section>
    </div>

  )
}

export default ContraseñaOlvidada;
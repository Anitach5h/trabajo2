import React from 'react';

class SignupForm extends React.Component {
  render() {
    return (
      <div>
        <h1>Registro</h1>
        <form action="procesar_registro.php" method="POST">
        <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" name="name" required maxLength={25} minLength={2}/>
          <br />

          <label htmlFor="lastname">Apellido:</label>
          <input type="text" id="lastname" name="lastname" required maxLength={25} minLength={2}/>
          <br />


          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <br />

          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" name="password" required />
          <br />

          <label htmlFor="repeat_password">Repetir Contraseña:</label>
          <input type="password" id="repeat_password" name="repeat_password" required />
          <br />

          <button type="submit">Registrar</button>
        </form>
      </div>
    );
  }
}

export default SignupForm;


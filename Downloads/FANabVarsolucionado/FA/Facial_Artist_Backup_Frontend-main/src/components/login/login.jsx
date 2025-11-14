import { useState } from "react";
import { useAuthContext } from "../../context/authcontext";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

export const Login = () => {
  const { login } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // login devuelve el usuario autenticado o null
    const userLogged = await login(email, password);

    if (userLogged) {
      if (userLogged.rol === "Administrador") {
    navigate("/admin");  
      } else if (userLogged.rol === "Usuario") {
        navigate("/client-dashboard");
      } else {
        alert("Rol no reconocido");
      }
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="login-container">
      {/* Flecha para volver */}
      <button className="login-back" onClick={() => navigate("/")}>
        ← Volver al inicio
      </button>

      {/* Encabezado */}
      <div className="login-header">
        <div className="login-logo"></div>
        <h1 className="login-nombre">Natalia Salazar Artist</h1>
        <p className="login-subtitulo">Tu belleza, nuestra pasión</p>
      </div>

      {/* Tarjeta principal */}
      <div className="login-card">
        <h2 className="login-titulo">Iniciar Sesión</h2>
        <p className="login-descripcion">Accede a tu cuenta para gestionar tus citas</p>

        <form className="login-formulario" onSubmit={handleSubmit}>
          <label className="login-label" htmlFor="email">
            Correo Electrónico
          </label>
          <input
            className="login-input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="tu@email.com"
          />

          <label className="login-label" htmlFor="password">
            Contraseña
          </label>
          <input
            className="login-input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />

          <button className="btn-login" type="submit">
            Iniciar Sesión
          </button>
        </form>

        <div className="login-links">
          <p>
            ¿No tienes cuenta?{" "}
            <Link className="login-enlace" to="/registro">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

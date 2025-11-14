import { useState } from "react";
import { crearUsuario } from "../../services/usuarioService";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // 👈 icono para la flecha

import "./registro.css";

export const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    clave: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await crearUsuario(formData);
      setSuccess("✅ Usuario creado exitosamente.");
      setError(null);
      setFormData({ nombre: "", email: "", clave: "" });
      setTimeout(() => {
        navigate("/login"); // 👈 redirige al login después del registro
      }, 1000);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <div className="registro-fondo">
      <div className="registro-contenedor">
        {/* 🔙 Flecha para volver al inicio */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            marginBottom: "1rem",
          }}
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={20} style={{ marginRight: "0.5rem" }} />
          <span style={{ fontSize: "0.95rem", fontWeight: "500" }}>
            Volver al inicio
          </span>
        </div>

        {/* 🔸 Encabezado */}
        <div className="registro-icono">👤</div>
        <h2 className="registro-brand">Crear Cuenta</h2>
        <p className="registro-subtitulo">
          Regístrate para acceder a nuestros servicios
        </p>

        {/* 🔸 Formulario */}
        <div className="registro-card">
          <form className="registro-formulario" onSubmit={handleSubmit}>
            <div className="registro-grupo">
              <label className="registro-etiqueta">Nombre completo</label>
              <input
                className="registro-entrada"
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="registro-grupo">
              <label className="registro-etiqueta">Correo electrónico</label>
              <input
                className="registro-entrada"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="registro-grupo">
              <label className="registro-etiqueta">Contraseña</label>
              <input
                className="registro-entrada"
                type="password"
                name="clave"
                value={formData.clave}
                onChange={handleChange}
                required
              />
            </div>

            <button className="registro-boton" type="submit">
              Registrar
            </button>

            {error && <p className="registro-error">{error}</p>}
            {success && <p className="registro-exito">{success}</p>}

            <p className="registro-texto">
              ¿Ya tienes una cuenta?{" "}
              <Link className="registro-enlace" to="/login">
                Inicia sesión aquí
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registro;

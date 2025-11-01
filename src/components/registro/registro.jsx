import { useState } from "react";
import { crearUsuario } from "../../services/usuarioService";
import { Link, useNavigate } from "react-router-dom";

import "./registro.css"

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
      setSuccess("Usuario creado exitosamente.");
      setError(null);
      setFormData({ nombre: "", email: "", clave: "", id_rol: "" });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <div className="registro-fondo">
      <div className="registro-tarjeta">
        <h2 className="registro-titulo">Registro de Usuario</h2>
        <form className="registro-formulario" onSubmit={handleSubmit}>
          <div className="registro-grupo">
            <label className="registro-etiqueta">Nombre</label>
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
            <label className="registro-etiqueta">Email</label>
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
            <label className="registro-etiqueta">Clave</label>
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
            <Link className="registro-enlace" to="/">
              Iniciar sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

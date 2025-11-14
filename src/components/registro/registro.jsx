import { useState } from "react";
import { crearUsuario } from "../../services/usuarioService";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./registro.css";

export const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    fecha_nacimiento: "",
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
      await crearUsuario(formData);

      setSuccess("Usuario creado exitosamente.");
      setError(null);

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <div className="registro-fondo">
      <div className="registro-contenedor">

        {/* VOLVER */}
        <div className="registro-volver" onClick={() => navigate("/")}>
          <ArrowLeft size={20} />
          <span>Volver</span>
        </div>

        {/* ENCABEZADO */}
        <div className="registro-icono"></div>
        <h2 className="registro-titulo">Únete a Nosotras</h2>
        <p className="registro-subtitulo">
          Crea tu cuenta y comienza tu viaje de belleza
        </p>

        <div className="registro-card">
          <h3 className="registro-card-titulo">Crear Cuenta</h3>
          <p className="registro-card-sub">Completa tus datos para registrarte</p>

          <form className="registro-formulario" onSubmit={handleSubmit}>

            {/* NOMBRE + APELLIDO */}
            <div className="registro-grid-2">
              <div className="registro-grupo">
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="registro-grupo">
                <label>Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="registro-grupo">
              <label>Correo Electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* TELEFONO + NACIMIENTO */}
            <div className="registro-grid-2">
              <div className="registro-grupo">
                <label>Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="registro-grupo">
                <label>Fecha de nacimiento</label>
                <input
                  type="date"
                  name="fecha_nacimiento"
                  value={formData.fecha_nacimiento}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="registro-grupo">
              <label>Contraseña</label>
              <input
                type="password"
                name="clave"
                value={formData.clave}
                onChange={handleChange}
                required
              />
            </div>

            <button className="registro-boton" type="submit">
              Crear Cuenta
            </button>

            {error && <p className="registro-error">{error}</p>}
            {success && <p className="registro-exito">{success}</p>}

            <p className="registro-texto">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="registro-enlace">
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

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "../agendamiento/AgendarCita.css";

export const AgendarCita = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    servicio: "",
    profesional: "",
    fecha: new Date(),
    hora: "",
    nombre: "",
    celular: "",
    email: "",
    notas: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, fecha: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const citaData = {
      servicio: formData.servicio,
      profesional: formData.profesional,
      fecha: formData.fecha
        ? new Date(formData.fecha).toISOString().split("T")[0]
        : null,
      hora:
        formData.hora.includes("AM") || formData.hora.includes("PM")
          ? convertirHora12a24(formData.hora)
          : formData.hora,
      nombre: formData.nombre,
      celular: formData.celular,
      email: formData.email,
      notas: formData.notas || "",
      estado: "pendiente",
      id_usuario: null,
    };

    try {
      // 🔹 Modificación: modo cors para evitar errores de fetch
      const response = await fetch("http://localhost:3000/api/citas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(citaData),
        mode: "cors", 
      });

      // 🔹 Validar respuesta antes de parsear JSON
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        alert("⚠️ " + (data.error || "Error al registrar cita"));
        return;
      }

      const data = await response.json();

      alert("✅ Cita registrada correctamente");
      console.log("Cita guardada:", data);

      // 🔹 Reset formulario
      setFormData({
        servicio: "",
        profesional: "",
        fecha: new Date(),
        hora: "",
        nombre: "",
        celular: "",
        email: "",
        notas: "",
      });
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      alert(
        "Error de conexión con el servidor. Asegúrate de que el backend esté corriendo en http://localhost:3000"
      );
    }
  };

  function convertirHora12a24(hora12) {
    const [time, meridian] = hora12.split(" ");
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours);
    if (meridian === "PM" && hours !== 12) hours += 12;
    if (meridian === "AM" && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, "0")}:${minutes}:00`;
  }

  const horasDisponibles = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  return (
    <div className="contenedor_agendar_cita">
      <div className="bloque_izquierdo">
        <h2>Agendar Cita</h2>
        <p>Completa los datos para tu cita de belleza</p>

        <form onSubmit={handleSubmit} className="formulario_cita">
          {/* -------- DETALLES DE LA CITA -------- */}
          <section className="detalles_cita">
            <h3> Detalles de la Cita</h3>

            <div className="campo">
              <label>Servicio *</label>
              <select
                name="servicio"
                value={formData.servicio}
                onChange={handleChange}
              >
                <option value="">Selecciona un servicio</option>
                <option value="cejas">Cejas</option>
                <option value="pestañas">Pestañas</option>
                <option value="micropigmentacion">Micropigmentación</option>
                <option value="combo">Combo Facial + Cejas</option>
              </select>
            </div>

            <div className="campo">
              <label>Profesional *</label>
              <select
                name="profesional"
                value={formData.profesional}
                onChange={handleChange}
              >
                <option value="">Selecciona un profesional</option>
                <option value="andrea">Andrea</option>
                <option value="paula">Paula</option>
                <option value="lina">Lina</option>
              </select>
            </div>

            <div className="campo_doble">
              <div className="campo calendario-inline">
                <label>Selecciona la fecha *</label>

                <DatePicker
                  selected={formData.fecha}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  inline
                />
              </div>

              <div className="campo">
                <label>Hora *</label>
                <select
                  name="hora"
                  value={formData.hora}
                  onChange={handleChange}
                >
                  <option value="">Selecciona una hora</option>
                  {horasDisponibles.map((hora, i) => (
                    <option key={i} value={hora}>
                      {hora}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* -------- DATOS DEL CLIENTE -------- */}
          <section className="tus_datos">
            <h3>Tus Datos</h3>

            <div className="campo_doble">
              <div className="campo">
                <label>Nombre Completo *</label>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Tu nombre completo"
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </div>

              <div className="campo">
                <label>Celular *</label>
                <input
                  type="tel"
                  name="celular"
                  placeholder="+57 301 555 0123"
                  value={formData.celular}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="campo">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="campo">
              <label>Notas (Opcional)</label>
              <textarea
                name="notas"
                placeholder="Algún comentario especial o solicitud..."
                value={formData.notas}
                onChange={handleChange}
              />
            </div>
          </section>

          <button type="submit" className="btn_agendar">
            Agendar cita
          </button>
        </form>
      </div>

      <div className="bloque_derecho">
        <div className="login_box">
          <h4>¿Ya tienes cuenta?</h4>
          <p>
            Inicia sesión para acceder a tus datos e historial de citas,
            o crea una cuenta nueva.
          </p>
          <button
            className="btn_login"
            onClick={() => navigate("/login")}
          >
            Iniciar Sesión / Registrarse
          </button>
          <button className="btn_invitado">Continuar como invitado</button>
        </div>
      </div>
    </div>
  );
};

export default AgendarCita;

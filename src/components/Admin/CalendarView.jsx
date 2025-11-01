import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus, RefreshCw, Calendar, X } from "lucide-react";
import "./CalendarView.css";

export function CalendarView() {
  // ✅ Manejo seguro de variables de entorno (compatible con Vite y CRA)
  const API = (() => {
    if (typeof import.meta !== "undefined" && import.meta.env) {
      return import.meta.env.VITE_API_URL || "http://localhost:3000";
    }
    return "http://localhost:3000";
  })();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ nota: "", estado: "", hora: "" });
  const [appointments, setAppointments] = useState([]);

  // 🧠 Cargar citas al montar el componente
  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const response = await fetch(`${API}/api/citas`);
        if (!response.ok) throw new Error("Error al cargar citas");
        const data = await response.json();

        setAppointments(
          data.map((cita) => ({
            id: cita.id_cita?.toString(),
            time: cita.hora,
            date: cita.fecha,
            status: cita.estado,
            nota: cita.nota,
          }))
        );
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchCitas();
  }, [API]);

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];
  const dayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === "next" ? 1 : -1));
      return newDate;
    });
  };

  const getTrafficLightColor = (color) => {
    switch (color) {
      case "green": return "traffic-green";
      case "yellow": return "traffic-yellow";
      case "red": return "traffic-red";
      default: return "";
    }
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    const startDay = firstDay.getDay() === 0 ? 7 : firstDay.getDay();

    // Días del mes anterior
    for (let i = startDay - 1; i > 0; i--) {
      const prev = new Date(year, month, 1 - i);
      days.push({ date: prev, current: false });
    }

    // Días del mes actual
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      const dateStr = date.toISOString().split("T")[0];
      const dayAppointments = appointments.filter((a) => a.date === dateStr);
      days.push({ date, current: true, appointments: dayAppointments });
    }

    // Completar hasta 42 días
    while (days.length < 42) {
      const next = new Date(year, month + 1, days.length - lastDay.getDate() - (startDay - 1) + 1);
      days.push({ date: next, current: false });
    }

    return days;
  };

  const handleDayClick = (day) => {
    setSelectedDate(day.date);
    setFormData({ nota: "", estado: "", hora: "" });
    setShowModal(true);
  };

  // 🧩 Guardar nueva cita en backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Obtener id_usuario del localStorage (si el usuario ha iniciado sesión)
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    const id_usuario = userInfo.id_usuario;

    // if (!id_usuario) {
    //   alert("Debes iniciar sesión para crear citas");
    //   return;
    // }

    const payload = {
      fecha: selectedDate?.toISOString().split("T")[0],
      hora: formData.hora,
      nota: formData.nota,
      estado: formData.estado || "pendiente",
      id_usuario,
    };

    try {
      const resp = await fetch(`${API}/api/citas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) throw new Error("Error al crear cita");

      const created = await resp.json();

      setAppointments((prev) => [
        ...prev,
        {
          id: created.id_cita?.toString(),
          time: created.hora,
          date: created.fecha,
          status: created.estado,
          nota: created.nota,
        },
      ]);

      setShowModal(false);
    } catch (err) {
      console.error("Error:", err);
      alert("No se pudo crear la cita");
    }
  };

  return (
    <div className="calendar-view">
      <div className="calendar-header">
        <h2>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="calendar-buttons">
          <button onClick={() => navigateMonth("prev")} className="btn-nav">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => navigateMonth("next")} className="btn-nav">
            <ChevronRight size={18} />
          </button>
          <button className="btn-sync">
            <RefreshCw size={16} /> Sincronizar
          </button>
          <button
            className={`btn-mode ${viewMode === "month" ? "active" : ""}`}
            onClick={() => setViewMode("month")}
          >
            Mes
          </button>
          <button
            className={`btn-mode ${viewMode === "week" ? "active" : ""}`}
            onClick={() => setViewMode("week")}
          >
            Semana
          </button>
        </div>
      </div>

      {/* Días */}
      <div className="calendar-grid">
        {dayNames.map((d) => (
          <div key={d} className="calendar-dayname">{d}</div>
        ))}

        {getDaysInMonth().map((day, i) => (
          <div
            key={i}
            className={`calendar-day ${day.current ? "current" : "other-month"}`}
            onClick={() => handleDayClick(day)}
          >
            <div className="day-number">{day.date.getDate()}</div>
            {day.appointments &&
              day.appointments.map((a) => (
                <div key={a.id} className="appointment">
                  <span>{a.time}</span>
                  <small>{a.nota || a.status}</small>
                </div>
              ))}
          </div>
        ))}
      </div>

      <button className="btn-add">
        <Plus size={20} />
      </button>

      <div className="calendar-tip">
        <Calendar size={16} />
        <p>
          <strong>Consejo:</strong> Haz clic en un día para crear o editar una cita.
        </p>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <X size={20} />
            </button>
            <h3>Nueva Cita</h3>
            <form onSubmit={handleSubmit}>
              <label>Fecha:</label>
              <input
                type="text"
                value={selectedDate?.toISOString().split("T")[0]}
                readOnly
              />

              <label>Hora:</label>
              <input
                type="time"
                value={formData.hora}
                onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                required
              />

              <label>Nota:</label>
              <textarea
                value={formData.nota}
                onChange={(e) => setFormData({ ...formData, nota: e.target.value })}
                required
              />

              <label>Estado:</label>
              <select
                value={formData.estado}
                onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                required
              >
                <option value="">Seleccionar...</option>
                <option value="pendiente">Pendiente</option>
                <option value="confirmado">Confirmado</option>
                <option value="cancelado">Cancelado</option>
              </select>

              <button type="submit" className="btn-save">
                Guardar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

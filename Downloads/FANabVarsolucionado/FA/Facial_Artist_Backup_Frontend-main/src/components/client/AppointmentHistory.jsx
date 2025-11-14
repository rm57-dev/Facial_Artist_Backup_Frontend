import React, { useState } from "react";
import "./AppointmentHistory.css";
import {
  Calendar,
  Clock,
  User,
  DollarSign,
  MapPin,
  Eye,
  MessageCircle,
  RefreshCw,
  X
} from "lucide-react";

export default function AppointmentHistory({ appointments: propAppointments }) {
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const mockAppointments = [
    {
      id: "1",
      service: "Microblading",
      date: "2025-01-20",
      time: "10:00",
      status: "confirmed",
      price: 350000,
      professional: "Natalia Salazar",
      notes: "Primera sesión completa de microblading",
      location: "Calle 85 #15-32, Zona Rosa, Bogotá",
    },
    {
      id: "2",
      service: "Retoque Microblading",
      date: "2024-12-15",
      time: "14:30",
      status: "completed",
      price: 200000,
      professional: "Natalia Salazar",
      notes: "Retoque de seguimiento después de 6 semanas",
      location: "Calle 85 #15-32, Zona Rosa, Bogotá",
    },
    {
      id: "3",
      service: "Laminado de cejas",
      date: "2024-11-10",
      time: "11:00",
      status: "completed",
      price: 120000,
      professional: "Carolina Méndez",
      notes: "Tratamiento de laminado y tinte",
      location: "Calle 85 #15-32, Zona Rosa, Bogotá",
    },
  ];

  const appointments = propAppointments || mockAppointments;

  const upcomingAppointments = appointments.filter(
    (a) => a.status === "confirmed" || a.status === "pending"
  );
  const pastAppointments = appointments.filter(
    (a) => a.status === "completed" || a.status === "cancelled"
  );

  const getStatusText = (status) => {
    switch (status) {
      case "confirmed":
        return "Confirmada";
      case "pending":
        return "Pendiente";
      case "completed":
        return "Completada";
      case "cancelled":
        return "Cancelada";
      default:
        return status;
    }
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="history-container">
      {upcomingAppointments.length > 0 && (
        <section>
          <h2 className="history-title">
            <Calendar className="icon-gold" /> Próximas Citas
          </h2>
          <div className="appointments-list">
            {upcomingAppointments.map((apt) => (
              <div className="appointment-card" key={apt.id}>
                <div className="card-header">
                  <div className="appointment-icon">
                    <Calendar size={22} />
                  </div>
                  <div>
                    <h3>{apt.service}</h3>
                    <p>
                      {formatDate(apt.date)} a las {apt.time}
                    </p>
                    <p>con {apt.professional}</p>
                  </div>
                </div>
                <div className="card-footer">
                  <span className={`status ${apt.status}`}>
                    {getStatusText(apt.status)}
                  </span>
                  <span className="price">{formatPrice(apt.price)}</span>
                  <button
                    className="btn-outline"
                    onClick={() => setSelectedAppointment(apt)}
                  >
                    <Eye size={14} /> Ver
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {pastAppointments.length > 0 && (
        <section>
          <h2 className="history-title">
            <Clock className="icon-gold" /> Historial de Citas
          </h2>
          <div className="appointments-list">
            {pastAppointments.map((apt) => (
              <div className="appointment-card" key={apt.id}>
                <div className="card-header">
                  <div className="appointment-icon">
                    <Calendar size={22} />
                  </div>
                  <div>
                    <h3>{apt.service}</h3>
                    <p>
                      {formatDate(apt.date)} a las {apt.time}
                    </p>
                    <p>con {apt.professional}</p>
                  </div>
                </div>
                <div className="card-footer">
                  <span className={`status ${apt.status}`}>
                    {getStatusText(apt.status)}
                  </span>
                  <span className="price">{formatPrice(apt.price)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

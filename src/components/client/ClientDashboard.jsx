import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Camera,
  Plus,
  LogOut,
  Sparkles,
  Heart,
  Star,
  Home,
} from "lucide-react";
import "./ClientDashboard.css";

export const ClientDashboard = ({ onLogout, onBookingClick, onHomeClick, userData }) => {
  const [activeTab, setActiveTab] = useState("appointments");

  const appointments = [
    {
      id: "1",
      service: "Microblading",
      date: "2025-01-20",
      time: "10:00",
      status: "confirmed",
      price: 350000,
      professional: "Natalia Salazar",
    },
    {
      id: "2",
      service: "Retoque Microblading",
      date: "2024-12-15",
      time: "14:30",
      status: "completed",
      price: 200000,
      professional: "Natalia Salazar",
    },
    {
      id: "3",
      service: "Laminado de cejas",
      date: "2024-11-10",
      time: "11:00",
      status: "completed",
      price: 120000,
      professional: "Natalia Salazar",
    },
  ];

  const photoHistory = [
    {
      id: "1",
      date: "2024-12-15",
      service: "Microblading",
      beforePhoto: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=300&h=300&fit=crop",
      afterPhoto: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=300&h=300&fit=crop",
    },
    {
      id: "2",
      date: "2024-11-10",
      service: "Laminado de cejas",
      beforePhoto: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=300&h=300&fit=crop",
      afterPhoto: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=300&h=300&fit=crop",
    },
  ];

  const formatPrice = (price) =>
    new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(price);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const totalSpent = appointments
    .filter((a) => a.status === "completed")
    .reduce((total, a) => total + a.price, 0);

  return (
    <div className="dashboard_bg">
      {/* HEADER */}
      <header className="dashboard_header">
        <div className="header_left">
          <Sparkles className="icon_gold" />
          <div>
            <h1>Mi Perfil</h1>
            <p>Natalia Brow Artist Studio</p>
          </div>
        </div>

        <div className="header_right">
          {onHomeClick && (
            <button className="btn_outline" onClick={onHomeClick}>
              <Home className="icon_small" /> Volver a inicio
            </button>
          )}
          <button className="btn_gold" onClick={onBookingClick}>
            <Plus className="icon_small" /> Nueva Cita
          </button>
          <button className="btn_outline" onClick={onLogout}>
            <LogOut className="icon_small" /> Cerrar sesión
          </button>
        </div>
      </header>

      {/* TARJETA BIENVENIDA */}
      <section className="welcome_card">
        <div className="welcome_info">
          <img
            src="https://images.unsplash.com/photo-1494790108755-2616c7e6a2b5?w=150&h=150&fit=crop&crop=face"
            alt="avatar"
            className="avatar"
          />
          <div>
            <h2>¡Hola, {userData?.firstName || "María"}! 👋</h2>
            <p>Bienvenida de vuelta. Tu belleza es nuestra pasión.</p>
            <div className="welcome_stats">
              <span>
                <Calendar className="icon_small" /> {appointments.length} citas
              </span>
              <span>
                <Star className="icon_small gold" /> Cliente VIP
              </span>
            </div>
          </div>
        </div>
        <div className="welcome_total">
          <p>Total invertido</p>
          <h3>{formatPrice(totalSpent)}</h3>
        </div>
      </section>

      {/* STATS */}
      <div className="stats_grid">
        <div className="stat_card">
          <Calendar className="icon_stat green" />
          <h4>Próxima Cita</h4>
          <p>20 de Enero</p>
          <span className="text_green">Microblading</span>
        </div>

        <div className="stat_card">
          <Clock className="icon_stat blue" />
          <h4>Tiempo con Nosotras</h4>
          <p>8 meses</p>
          <span className="text_blue">Desde Mayo 2024</span>
        </div>

        <div className="stat_card">
          <Heart className="icon_stat pink" />
          <h4>Satisfacción</h4>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="icon_small gold" />
            ))}
          </div>
          <span className="text_pink">5.0 estrellas</span>
        </div>
      </div>

      {/* TABS */}
      <div className="tabs">
        <div className="tabs_header">
          <button
            className={`tab_btn ${activeTab === "appointments" ? "active" : ""}`}
            onClick={() => setActiveTab("appointments")}
          >
            <Calendar className="icon_small" /> Mis Citas
          </button>
          <button
            className={`tab_btn ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <User className="icon_small" /> Mi Perfil
          </button>
          <button
            className={`tab_btn ${activeTab === "gallery" ? "active" : ""}`}
            onClick={() => setActiveTab("gallery")}
          >
            <Camera className="icon_small" /> Mi Galería
          </button>
        </div>

        {/* TAB CONTENIDO */}
        <div className="tab_content">
          {activeTab === "appointments" && (
            <div className="appointments_list">
              {appointments.map((a) => (
                <div key={a.id} className="appointment_card">
                  <h4>{a.service}</h4>
                  <p>{formatDate(a.date)}</p>
                  <p>{a.time} — {a.professional}</p>
                  <p className={`status ${a.status}`}>{a.status}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "profile" && (
            <div className="profile_tab">
              <h3>Información Personal</h3>
              <div className="profile_grid">
                <div>
                  <label>Nombre completo</label>
                  <p>{userData?.firstName || "María"} {userData?.lastName || "González"}</p>
                </div>
                <div>
                  <label>Teléfono</label>
                  <p><Phone className="icon_small" /> {userData?.phone || "+57 300 123 4567"}</p>
                </div>
                <div>
                  <label>Email</label>
                  <p><Mail className="icon_small" /> {userData?.email || "maria@email.com"}</p>
                </div>
                <div>
                  <label>Fecha de nacimiento</label>
                  <p>{userData?.birthDate ? formatDate(userData.birthDate) : "15 de Marzo, 1985"}</p>
                </div>
              </div>
              <button className="btn_outline gold">Editar información</button>
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="gallery_tab">
              <h3>Mi Historial Fotográfico</h3>
              <p>Mira la evolución de tu belleza con nosotras 💖</p>
              <div className="gallery_grid">
                {photoHistory.map((p) => (
                  <div key={p.id} className="photo_card">
                    <h4>{p.service}</h4>
                    <p>{formatDate(p.date)}</p>
                    <div className="photos">
                      <div>
                        <p>Antes</p>
                        <img src={p.beforePhoto} alt="Antes" />
                      </div>
                      <div>
                        <p>Después</p>
                        <img src={p.afterPhoto} alt="Después" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authcontext";
import {
  User,
  Phone,
  Mail,
  Camera,
  Plus,
  LogOut,
  Sparkles,
  Home,
} from "lucide-react";
import "./ClientDashboard.css";

export const ClientDashboard = ({ onBookingClick, onHomeClick, userData }) => {
  const [activeTab, setActiveTab] = useState("profile");

  // ✅ CONTEXTO Y NAVEGACIÓN
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  // ✅ FUNCIÓN DEL BOTÓN "Cerrar sesión"
  const handleLogout = () => {
    logout();          // Limpia token / sesión
    navigate("/login"); // Redirige al login
  };

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

          {/* 🔴 BOTÓN CERRAR SESIÓN CON FUNCIONALIDAD */}
          <button className="btn_outline" onClick={handleLogout}>
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
          </div>
        </div>
      </section>

      {/* TABS */}
      <div className="tabs">
        <div className="tabs_header">
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

          {/* PERFIL */}
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
                  <p>{userData?.birthDate || "15 de Marzo, 1985"}</p>
                </div>
              </div>
              <button className="btn_outline gold">Editar información</button>
            </div>
          )}

          {/* GALERÍA */}
          {activeTab === "gallery" && (
            <div className="gallery_tab">
              <h3>Mi Historial Fotográfico</h3>
              <p>Mira la evolución de tu belleza con nosotras 💖</p>
              <div className="gallery_grid">
                {photoHistory.map((p) => (
                  <div key={p.id} className="photo_card">
                    <h4>{p.service}</h4>
                    <p>{p.date}</p>
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Solo esto se agregó
import "./Hero.css";
import heroBg from "../assets/cejalaminada.jpg"; // 👈 asegúrate de que exista esta imagen

export default function Hero({ onBookingClick }) {
  const navigate = useNavigate(); // 👈 Hook de navegación

  const scrollToServices = () => {
    const section = document.getElementById("servicios");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ Redirige al agendamiento, pero sin romper tu prop
  const handleBooking = () => {
    if (onBookingClick) onBookingClick();
    navigate("/agendamiento");
  };

  return (
    <section
      id="inicio"
      className="hero"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1>
          Realza tu <span>Belleza Natural</span>
        </h1>
        <p>
          Descubre tratamientos personalizados de belleza y bienestar en un
          ambiente exclusivo diseñado para realzar tu elegancia natural.
        </p>

        <div className="hero-buttons">
          <button className="btn-primary" onClick={handleBooking}>
            Reservar Cita
          </button>
          <button className="btn-outline" onClick={scrollToServices}>
            Ver Servicios
          </button>
        </div>
      </div>

      <button className="scroll-indicator" onClick={scrollToServices}>
        <span>Explorar</span>
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </button>
    </section>
  );
}


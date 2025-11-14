import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom"; // 👈 Importa el hook para redirigir
import logo from "../assets/logo.png";
import "./Header.css";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // 👈 Hook de navegación

  const navItems = [
    { name: "Inicio", href: "#inicio" },
    { name: "Servicios", href: "#servicios" },
    { name: "Galería", href: "#galeria" },
    { name: "Ubicación", href: "#ubicacion" },
    { name: "Contacto", href: "#contacto" },
  ];

  // 👇 Funciones para los botones
  const handleLoginClick = () => navigate("/login");
  const handleBookingClick = () => navigate("/agendamiento");

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo" onClick={() => navigate("/")}>
          <img src={logo} alt="Natalia Salazar Artist Studio" />
        </div>

        {/* Navegación */}
        <nav className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          {navItems.map((item) => (
            <a key={item.name} href={item.href}>
              {item.name}
            </a>
          ))}

          {/* Botones visibles solo en móvil */}
          <div className="mobile-buttons">
            <button className="btn-outline" onClick={handleLoginClick}>
              Iniciar Sesión
            </button>
            <button className="btn-gold" onClick={handleBookingClick}>
              Agendar Cita
            </button>
          </div>
        </nav>

        {/* Botones desktop */}
        <div className="header-buttons">
          <button className="btn-outline" onClick={handleLoginClick}>
            Iniciar Sesión
          </button>
          <button className="btn-gold" onClick={handleBookingClick}>
            Agendar Cita
          </button>
        </div>

        {/* Menú móvil */}
        <div
          className="menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>
    </header>
  );
}

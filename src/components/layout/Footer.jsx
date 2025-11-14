import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // 👈 IMPORTANTE
import logo from "../assets/logoenblanco.png";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate(); // 👈 ACTIVAMOS NAVEGACIÓN

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Columna 1: Logo y descripción */}
        <div className="footer-section">
          <img
            src={logo}
            alt="Logo Natalia Salazar Artist"
            className="footer-logo"
          />
          <p className="footer-description">
            Descubre tratamientos personalizados de belleza y bienestar en un
            ambiente exclusivo diseñado para realzar tu elegancia natural.
          </p>

          <div className="newsletter">
            <h4>Registrate para agendar tu cita.</h4>
            <div className="newsletter-input">
              <button onClick={() => navigate("/registro")}>
                Registrate
              </button>
            </div>
          </div>
        </div>

        {/* Columna 2: Información de contacto */}
        <div className="footer-section">
          <h4>Información de Contacto</h4>
          <ul>
            <li>
              <MapPin className="icon" />
              Cl. 33 B #753, Urbanización del bosque, Palmira, Valle del Cauca
            </li>
            <li>
              <Phone className="icon" /> +57 316 897 8439
            </li>
            <li>
              <Mail className="icon" /> nataliasalazar0794@gmail.com
            </li>
          </ul>
        </div>

        {/* Columna 3: Servicios */}
        <div className="footer-section">
          <h4>Servicios Principales</h4>
          <ul>
            <li>Tratamientos Faciales</li>
            <li>Microblading</li>
            <li>Extensiones de Pestañas</li>
            <li>Maquillaje Profesional</li>
            <li>Cuidado Corporal</li>
          </ul>
        </div>

        {/* Columna 4: Redes Sociales */}
        <div className="footer-section">
          <h4>Síguenos</h4>
          <div className="footer-icons">
            <a
              href="https://instagram.com/nataliasalazarartist"
              target="_blank"
              rel="noreferrer"
              className="icon instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.facebook.com/nataliamakeup07/?locale=es_LA"
              target="_blank"
              rel="noreferrer"
              className="icon facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://twitter.com/nataliasalazarartist"
              target="_blank"
              rel="noreferrer"
              className="icon twitter"
            >
              <Twitter size={18} />
            </a>
          </div>
        </div>
      </div>

      <hr className="footer-divider" />

      {/* Parte inferior */}
      <div className="footer-bottom">
        <p>© 2024 NataliaSalazarArtist. Todos los derechos reservados.</p>
        <div className="footer-links">
      
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import logo from "../assets/logoenblanco.png";
import "./Footer.css";

const Footer = () => {
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
            <h4>Suscríbete a nuestras novedades</h4>
            <div className="newsletter-input">
              <input type="email" placeholder="Tu email" />
              <button>Suscribir</button>
            </div>
          </div>
        </div>

        {/* Columna 2: Información de contacto */}
        <div className="footer-section">
          <h4>Información de Contacto</h4>
          <ul>
            <li>
              <MapPin className="icon" />
              Calle 85 #15-32, Zona Rosa<br />
              Bogotá, Colombia - Piso 3
            </li>
            <li>
              <Phone className="icon" /> +57 (301) 555-0123
            </li>
            <li>
              <Mail className="icon" /> info@nataliasalazarartist.com
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
              title="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://facebook.com/nataliasalazarartist"
              target="_blank"
              rel="noreferrer"
              className="icon facebook"
              title="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://twitter.com/nataliasalazarartist"
              target="_blank"
              rel="noreferrer"
              className="icon twitter"
              title="Twitter"
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
          <a href="#privacy">Política de Privacidad</a>
          <a href="#terms">Términos de Servicio</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

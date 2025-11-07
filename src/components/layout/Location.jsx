import React from "react";
import "./Location.css";
import { MapPin, Clock, Navigation, Phone } from "lucide-react";

export function Location() {
  const locationDetails = [
    {
      icon: <MapPin />,
      title: "Dirección Completa",
      content: "Cl. 33 B #753, Urbanización del bosque, Palmira, Valle del Cauca",
    },
    {
      icon: <Clock />,
      title: "Horarios de Atención",
      content: "Lunes a Viernes: 9:00 AM - 7:00 PM\nSábados: 9:00 AM - 5:00 PM\nDomingos: Cerrado",
    },
  ];

  const landmarks = [
    "Centro Comercial Andino (200m)",
    "Hotel Marriott (150m)",
    "Zona T (300m)",
    "Parque de la 93 (500m)",
  ];

  return (
    <section id="ubicacion" className="location-section">
      <div className="location-container">
        {/* Header */}
        <div className="location-header">
          <h2>Cómo Llegar</h2>
          <div className="underline"></div>
          <div className="location-subtitle">
          <p>
            Nos ubicamos en el corazón de la Zona Rosa de Bogotá, en un lugar
            accesible y con múltiples opciones de transporte.
          </p>
          </div>
          
        </div>

        {/* Mapa y datos */}
        <div className="location-grid">
          {/* Mapa */}
          <div className="map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.8910237070485!2d-76.28312498573545!3d3.528948543538043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3a05e27ef01b9f%3A0x45611f25124d5ff4!2sNatalia%20Salazar%20Brow%20Art%20Studio!5e0!3m2!1ses!2sco!4v1696362000000!5m2!1ses!2sco"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Ubicación NataliaSalazarArtist"
            ></iframe>
          </div>

          {/* Detalles */}
          <div className="details-grid">
            {locationDetails.map((detail, index) => (
              <div key={index} className="detail-card">
                <div className="icon-circle">{detail.icon}</div>
                <div>
                  <h3>{detail.title}</h3>
                  <p>{detail.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Referencias y contacto */}
        <div className="extra-info">
          <div className="card">
            <div className="card-header">
              <Navigation className="icon" />
              <h3>Puntos de Referencia</h3>
            </div>
            <ul>
              {landmarks.map((landmark, index) => (
                <li key={index}>{landmark}</li>
              ))}
            </ul>
          </div>

          <div className="card">
            <div className="card-header">
              <Phone className="icon" />
              <h3>¿Necesitas Ayuda?</h3>
            </div>
            <p>
              Si tienes dificultades para encontrarnos o necesitas indicaciones
              específicas, no dudes en contactarnos. Nuestro equipo estará
              encantado de ayudarte.
            </p>
            <div className="contact-info">
              <p>
                <strong>Teléfono:</strong>{" "}
                <a href="tel:+573168978439">+57 (316) 897-8439</a>
              </p>
              <p>
                <strong>WhatsApp:</strong>{" "}
                <a
                  href="https://wa.me/573168978439"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +57 (316) 897-8439
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

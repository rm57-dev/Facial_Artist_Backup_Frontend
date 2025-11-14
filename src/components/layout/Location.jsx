import React from "react";
import "./Location.css";
import { MapPin, Clock } from "lucide-react";

export function Location() {
  const locationDetails = [
    {
      icon: <MapPin />,
      title: "Dirección Completa",
      content: "Cl. 33 B #7-53, Urbanización del bosque, Palmira, Valle del Cauca",
    },
    {
      icon: <Clock />,
      title: "Horarios de Atención",
      content:
        "Lunes a Viernes: 9:00 AM - 7:00 PM\nSábados: 9:00 AM - 5:00 PM\nDomingos: Cerrado",
    },
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
           Nos ubicamos en el suroeste de Palmira, en una zona tranquila y segura, con fácil acceso y rodeada de comercios para tu comodidad.
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
      </div>
    </section>
  );
}

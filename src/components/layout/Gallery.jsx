import React, { useState } from "react";
import { X } from "lucide-react";
import "./Gallery.css";

import cejagaleria from "../assets/video3.mp4";
import labiogaleria from "../assets/cejas7.jpg";
import ceja2galeria from "../assets/cejas8.jpg";
import ceja3galeria from "../assets/ceja2.jpg";
import video1 from "../assets/labio3.mp4";
import ceja4galeria from "../assets/ceja8.jpg";
import ceja5galeria from "../assets/ceja9.jpg";
import video2 from "../assets/video1.mp4";

const galleryImages = [
  {
    id: 1,
    type: "video",
    src: cejagaleria,
    alt: "Micropigmetacion de labios profesional",
  },
  {
    id: 2,
    type: "image",
    src: labiogaleria,
    alt: "Extensiones de pestañas volumen",
  },
  {
    id: 3,
    type: "image",
    src: ceja2galeria,
    alt: "Tratamiento de labios con ácido hialurónico",
  },
  {
    id: 4,
    type: "image",
    src: ceja3galeria,
    alt: "Depilación y diseño de cejas",
  },
  {
    id: 5,
    type: "image",
    src: ceja4galeria,
    alt: "Lifting de pestañas naturales",
  },

  {
    id: 6,
    type: "video",
    src: video1,
    alt: "Video demostración de técnica",
  },

  {
    id: 7,
    type: "imagen",
    src: ceja5galeria,
    alt: "Perfilado de cejas con hilo profesional",
  },
  
  {
    id: 8,
    type: "video",
    src: video2,
    alt: "Maquillaje de ojos con delineado artístico",
  },
];

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section id="galeria" className="gallery-section">
      <div className="gallery-container">
        
        {/* Header */}
        <div className="gallery-header">
          <h2 className="gallery-title">Nuestra Galería</h2>
          <div className="gold-line"></div>
          <p className="gallery-subtitle">
            Descubre nuestros trabajos especializados en cejas, pestañas y labios. <br />
            Cada resultado refleja nuestra dedicación por realzar tu belleza natural.
          </p>
        </div>

        {/* Grid */}
        <div className="gallery-grid">
          {galleryImages.map((item) => (
            <div
              key={item.id}
              className="gallery-item"
              onClick={() => setSelectedItem(item)}
            >

              {item.type === "video" ? (
                <video
                  src={item.src}
                  muted
                  autoPlay
                  loop
                  playsInline
                  className="gallery-video"
                />
              ) : (
                <img src={item.src} alt={item.alt} className="gallery-image" />
              )}

            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedItem && (
          <div className="modal" onClick={() => setSelectedItem(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={() => setSelectedItem(null)}>
                <X size={24} color="#fff" />
              </button>

              {selectedItem.type === "video" ? (
                <video
                  src={selectedItem.src}
                  controls
                  autoPlay
                  loop
                  className="modal-video"
                />
              ) : (
                <img
                  src={selectedItem.src}
                  alt={selectedItem.alt}
                  className="modal-image"
                />
              )}

              <p className="modal-text">{selectedItem.alt}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
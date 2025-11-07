import React, { useState } from "react";
import { X } from "lucide-react";
import "./Gallery.css";
import cejagaleria from "../assets/cejagaleria.jpg";

const galleryImages = [
  {
    id: 1,
    src: cejagaleria,
    alt: "Microblading de cejas profesional",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1735151226446-1d364b4adc2f?q=80&w=1080",
    alt: "Extensiones de pestañas volumen",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1654374504608-67c4cfe65fca?q=80&w=1080",
    alt: "Tratamiento de labios con ácido hialurónico",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1644903751036-adeda377f28d?q=80&w=1080",
    alt: "Depilación y diseño de cejas",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1563635707334-5ce91b375ea6?q=80&w=1080",
    alt: "Lifting de pestañas naturales",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1575618890017-4313323c2435?q=80&w=1080",
    alt: "Maquillaje profesional de labios",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1616394584738-36e9b43044d8?q=80&w=1080",
    alt: "Perfilado de cejas con hilo profesional",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1603651596929-f48eb1fd8c89?q=80&w=1080",
    alt: "Maquillaje de ojos con delineado artístico",
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

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
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="gallery-item"
              onClick={() => setSelectedImage(image)}
            >
              <img src={image.src} alt={image.alt} className="gallery-image" />
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div className="modal" onClick={() => setSelectedImage(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={() => setSelectedImage(null)}>
                <X size={24} color="#fff" />
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="modal-image"
              />
              <p className="modal-text">{selectedImage.alt}</p>
            </div>
          </div>
        )}

        {/* CTA */}
        {/* <div className="gallery-cta">
          <p className="cta-text">
            ¿Te gustaría ser parte de nuestra galería de transformaciones?
          </p>
          <button className="cta-button">Reserva tu Transformación</button>
        </div> */}
      </div>
    </section>
  );
}

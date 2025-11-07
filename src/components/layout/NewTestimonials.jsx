import React from "react";
import "./NewTestimonials.css";

export function NewTestimonials() {
  const testimonials = [
    {
      id: 1,
      name: "María González",
      treatment: "Microblading",
      rating: 5,
      comment:
        "El resultado del microblading superó mis expectativas. Natalia es una verdadera artista, mis cejas quedaron perfectas y completamente naturales. ¡Súper recomendada!",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop",
    },
    {
      id: 2,
      name: "Carolina Pérez",
      treatment: "Lifting de Pestañas",
      rating: 5,
      comment:
        "Increíble el cambio en mi mirada con el lifting de pestañas. El ambiente de la clínica es súper relajante y el servicio es excelente. Definitivamente volveré.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    },
    {
      id: 3,
      name: "Ana Rodríguez",
      treatment: "Tratamiento Facial",
      rating: 5,
      comment:
        "Los tratamientos faciales de Natalia son espectaculares. Mi piel se ve radiante y rejuvenecida. Es la mejor inversión que he hecho para mi cuidado personal.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    },
  ];

  return (
    <section id="testimonios" className="testimonios-section">
      <div className="testimonios-container">
        <div className="testimonios-header">
          <h2>Lo que Dicen Nuestras Clientas</h2>
          <div className="testimonios-divider"></div>
          <div className="testimonios-subtitle">
            <p>
            La satisfacción de nuestras clientas es nuestro mayor orgullo.
            Descubre las experiencias de quienes ya han transformado su belleza
            con nosotros.
          </p>
          </div>
          
        </div>

        <div className="testimonios-grid">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonio-card">
              <div className="testimonio-quote">“</div>

              <div className="testimonio-avatar">
                <img src={t.avatar} alt={t.name} />
              </div>

              <h4>{t.name}</h4>
              <p className="treatment">{t.treatment}</p>

              <div className="stars">
                {[...Array(t.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>

              <blockquote>"{t.comment}"</blockquote>

              <div className="testimonio-border"></div>
            </div>
          ))}
        </div>

        {/* <div className="testimonios-stats">
          <div className="stat">
            <p className="stat-number">500+</p>
            <p className="stat-label">Clientas Felices</p>
          </div>
          <div className="stat">
            <p className="stat-number">98%</p>
            <p className="stat-label">Satisfacción</p>
          </div>
          <div className="stat">
            <p className="stat-number">5.0★</p>
            <p className="stat-label">Calificación</p>
          </div>
        </div> */}
      </div>
    </section>
  );
}

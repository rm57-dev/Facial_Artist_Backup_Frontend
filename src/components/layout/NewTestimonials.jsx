import React from "react";
import "./NewTestimonials.css";

export function NewTestimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sofía Vargas Viloria",
      comment:
        "Excelente servicio, mis cejitas perfectas con Nata y Deri. Los recomiendo un montón, vale completamente la pena, llegué con mis cejas destruidas y las convirtieron por completo 🤍🤍🤍 gracias! ",
      avatar:
        "https://lh3.googleusercontent.com/a/ACg8ocJ9hnBkZYznsNvcZ4CBTLYkeMhxj9JOWDIJSb3LLKPgfUl1Mg=w72-h72-p-rp-mo-br100",
    },
    {
      id: 2,
      name: "Camilo Zambrano",
      comment:
        "Excelente servicio! Su atención es personalizada y profesional. Mi esposa siempre queda encantada Y dejan sus cejas perfectas!",
      avatar:
        "https://lh3.googleusercontent.com/a/ACg8ocIKXcf75dSeDJf7sCD8CdmqpY98TyzcFWg5P1Z45A090JEkRw=w72-h72-p-rp-mo-br100",
    },
    {
      id: 3,
      name: "Daniela Cifuentes Castro",
      comment:
       "Amo este lugar, vivo en Cali y siempre que necesito de sus servicios voy hasta Palmira para hacer uso de los servicios de este gran equipo",
      avatar:
        "https://lh3.googleusercontent.com/a-/ALV-UjXuguEl1C3-kzI5JShugvbHuCxJj__PLLXAuJe8mXAcKN09KeAw=w72-h72-p-rp-mo-br100",
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
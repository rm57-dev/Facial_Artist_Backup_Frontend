import React from "react";
import "./Services.css";

import lifting from "../assets/ceja1.jpg";
import shadow from "../assets/ceja2.jpg";
import labios from "../assets/ceja3.jpg";
import laminado from "../assets/ceja5.jpg";
import diseno from "../assets/ceja6.jpg";
import henna from "../assets/cejagaleria.jpg";

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Lifting de Pestañas",
      description:
        "El lifting de pestañas es un tratamiento que curva y levanta las pestañas naturales, dándoles un aspecto más largo y definido sin usar extensiones ni máscara.",
      image: lifting,
    },
    {
      id: 2,
      title: "Shadow Brows",
      description:
        "Técnica de micropigmentación súper natural, para ti que te gusta tener tus cejas siempre arregladas y de forma linda.",
      image: shadow,
    },
    {
      id: 3,
      title: "Micropigmentación de labios",
      description:
        "La micropigmentación de labios es un tratamiento que aplica pigmentos semipermanentes para darles mejor color, forma y definición.",
      image: labios,
    },
    {
      id: 4,
      title: "Laminado de Cejas",
      description:
        "El laminado de cejas es un tratamiento que fija y da forma al vello, logrando cejas más definidas, alineadas, voluminosas y con un aspecto suave y brillante.",
      image: laminado,
    },
    {
      id: 5,
      title: "Diseño de cejas",
      description:
        "Diseño de cejas profesional: incluye limpieza y exfoliación, diseño acorde a tu rostro, hidratación con parches de colágeno y aplicación con hilo o cera.",
      image: diseno,
    },
    {
      id: 6,
      title: "Cejas en henna",
      description:
        "Diseño profesional de cejas en henna: limpieza, exfoliación, diseño, hidratación con colágeno y aplicación con hilo o cera y maquillaje con henna.",
      image: henna,
    },
  ];

  return (
    <section className="services-section" id="servicios">
      <div className="services-header">
        <h2 className="services-title">Nuestros Servicios</h2>
        <div className="gold-underline"></div>
        <p className="services-subtitle">
          Descubre una gama completa de servicios diseñados para realizar tu
          belleza natural con técnicas innovadoras y productos de la más alta
          calidad.
        </p>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <img
              src={service.image}
              alt={service.title}
              className="service-image"
            />
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
            <p className="service-more">Ver más</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;

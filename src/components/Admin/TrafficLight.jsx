import React, { useState } from "react";
import "./TrafficLight.css";

export function TrafficLight({ currentColor, onChange, size = "md" }) {
  const [isHovered, setIsHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const getSize = () => {
    switch (size) {
      case "sm":
        return "small";
      case "lg":
        return "large";
      default:
        return "medium";
    }
  };

  const getTooltipText = (lightColor) => {
    switch (lightColor) {
      case "green":
        return "Cliente confiable";
      case "yellow":
        return "Cliente con precauciones";
      case "red":
        return "Cliente problemático";
      default:
        return "";
    }
  };

  const handleSelect = (color) => {
    onChange && onChange(color);
    setMenuOpen(false);
  };

  return (
    <div className="trafficlight-container">
      <button
        className={`trafficlight-button ${isHovered ? "hovered" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setMenuOpen(!menuOpen)}
        title={getTooltipText(currentColor)}
      >
        <div className={`trafficlight-box ${getSize()}`}>
          <div
            className={`light red ${currentColor === "red" ? "active" : ""}`}
          ></div>
          <div
            className={`light yellow ${
              currentColor === "yellow" ? "active" : ""
            }`}
          ></div>
          <div
            className={`light green ${
              currentColor === "green" ? "active" : ""
            }`}
          ></div>
        </div>
      </button>

      {menuOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-item" onClick={() => handleSelect("green")}>
            <span className="dot green"></span>
            <div>
              <p className="label">Verde</p>
              <p className="desc">Cliente confiable</p>
            </div>
          </div>

          <div className="dropdown-item" onClick={() => handleSelect("yellow")}>
            <span className="dot yellow"></span>
            <div>
              <p className="label">Amarillo</p>
              <p className="desc">Precauciones</p>
            </div>
          </div>

          <div className="dropdown-item" onClick={() => handleSelect("red")}>
            <span className="dot red"></span>
            <div>
              <p className="label">Rojo</p>
              <p className="desc">Cliente problemático</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

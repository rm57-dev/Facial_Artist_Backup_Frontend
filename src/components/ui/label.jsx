import React from "react";
import "./Label.css";

export function Label({ className = "", children, disabled = false, ...props }) {
  // Maneja las clases según el estado (por ejemplo, deshabilitado)
  const classes = `
    label-base 
    ${disabled ? "label-disabled" : ""} 
    ${className}
  `.trim();

  return (
    <label className={classes} {...props}>
      {children}
    </label>
  );
}

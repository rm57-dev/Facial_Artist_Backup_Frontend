// src/components/ui/badge.jsx
import React from "react";
import "./badge.css";

export function Badge({ children, className = "" }) {
  return (
    <span className={`badge ${className}`}>
      {children}
    </span>
  );
}

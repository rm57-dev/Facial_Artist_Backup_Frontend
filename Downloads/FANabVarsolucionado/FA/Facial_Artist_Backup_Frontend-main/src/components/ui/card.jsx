import React from "react";
import "./Card.css";

export function Card({ className = "", ...props }) {
  return (
    <div
      data-slot="card"
      className={`card ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }) {
  return (
    <div
      data-slot="card-header"
      className={`card-header ${className}`}
      {...props}
    />
  );
}

export function CardTitle({ className = "", ...props }) {
  return (
    <h4
      data-slot="card-title"
      className={`card-title ${className}`}
      {...props}
    />
  );
}

export function CardDescription({ className = "", ...props }) {
  return (
    <p
      data-slot="card-description"
      className={`card-description ${className}`}
      {...props}
    />
  );
}

export function CardAction({ className = "", ...props }) {
  return (
    <div
      data-slot="card-action"
      className={`card-action ${className}`}
      {...props}
    />
  );
}

export function CardContent({ className = "", ...props }) {
  return (
    <div
      data-slot="card-content"
      className={`card-content ${className}`}
      {...props}
    />
  );
}

export function CardFooter({ className = "", ...props }) {
  return (
    <div
      data-slot="card-footer"
      className={`card-footer ${className}`}
      {...props}
    />
  );
}

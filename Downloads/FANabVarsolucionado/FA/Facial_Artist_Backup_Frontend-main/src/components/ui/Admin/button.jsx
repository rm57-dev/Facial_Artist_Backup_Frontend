import React from "react";
import "./button.css";

export function Button({
  children,
  variant = "default",
  size = "default",
  asChild = false,
  className = "",
  ...props
}) {
  const Comp = asChild ? "span" : "button";

  return (
    <Comp
      className={`btn ${variant} ${size} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
}

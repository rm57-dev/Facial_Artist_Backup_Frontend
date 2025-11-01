import React from "react";
// import { useTheme } from "next-themes"; // puedes quitar esta línea si no usas next-themes
// import { Toaster as Sonner } from "sonner";
import "./Toaster.css";

export default function Toaster(props) {
  const { theme = "light" } = useTheme ? useTheme() : {}; // fallback por si no tienes next-themes

  return (
    <Sonner
      theme={theme}
      className="toaster"
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
      }}
      {...props}
    />
  );
}

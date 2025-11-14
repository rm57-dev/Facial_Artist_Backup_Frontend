import React from "react";
import { Outlet } from "react-router-dom";
import { Header2 } from "./Header2"; // tu header del admin

export const AdminLayout = () => {
  return (
    <>
      <Header2 />
      <main className="admin-container">
        <Outlet /> {/* Aquí se cargan las vistas internas del admin */}
      </main>
    </>
  );
};

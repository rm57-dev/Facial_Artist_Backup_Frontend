import { useAuthContext } from "../context/authcontext";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Layout } from "../components/layout/Layout";

export const Principal = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  return (
      <div className="principal-dashboard">
      <h1 className="principal-bienvenida">Bienvenido {user?.nombre}</h1>
      <p className="principal-rol">Rol: {user?.rol}</p>

      <div className="principal-cards">
        <Card
          titulo="Gestion de Usuarios"
          descripcion="Crear, editar y eliminar usuarios del sistema."
          onClick={() => navigate("/admin/usuarios")}
        />
        <Card
          titulo="Gestion de Roles"
          descripcion="Administra los diferentes roles disponibles."
          onClick={() => navigate("/admin/roles")}
        />
        <Card
          titulo="Gestion de Permisos"
          descripcion="Define y organiza los permisos del sistema."
          
        />
        <Card
          titulo="Rol - Permisos"
          descripcion="Asigna los permisos a cada rol."
          onClick={() => navigate("/admin/rol-permisos")}
        />
      </div>
      </div>
    );
};
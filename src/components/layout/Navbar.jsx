import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/authcontext";
import "./Navbar.css";

export const Navbar = () => {
  const { user } = useAuthContext();

  if (!user || user.rol !== "Administrador") return null;

  return (
    <nav className="header-nav">
      <NavLink to="/usuarios" className="nav-link">Usuarios</NavLink>
      <NavLink to="/roles" className="nav-link">Roles</NavLink>
      <NavLink to="/permisos" className="nav-link">Permisos</NavLink>
      <NavLink to="/rol-permisos" className="nav-link">Rol-Permisos</NavLink>
      <NavLink to="/admin/dashboard" className="nav-link">Dashboard</NavLink>
    </nav>
  );
};
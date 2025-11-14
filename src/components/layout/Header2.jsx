import { useAuthContext } from "../../context/authcontext";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";

export const Header2 = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  return (
    <header className="admin-header">

      {/* Parte superior del panel admin */}
      <div className="admin-header-top">
        <h1 className="admin-logo" onClick={() => navigate("/admin/dashboard")}>
          Panel de Administración
        </h1>

        <div className="admin-user-info">
          <span>{user?.nombre} ({user?.rol})</span>
          <button onClick={logout} className="logout-btn">Cerrar Sesión</button>
        </div>
      </div>

      {/* Aquí se muestran tus pestañas del administrador */}
      <Navbar />
    </header>
  );
};



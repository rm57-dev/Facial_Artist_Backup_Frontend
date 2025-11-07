import {useAuthContext} from "../../context/authcontext";
import {useNavigate} from "react-router-dom";
import {Navbar} from "./Navbar";

export const Header = () => {
    const {user, logout} = useAuthContext();
    const navigate = useNavigate();

    return (
        <header className="header">
          <div className="header-left">
            <h1 className="header-logo" onClick={() => navigate("/principal")}>
              Admin Panel
            </h1>
            <Navbar />
          </div>
          <div className="header-right">
            <span className="header-user">
              {user?.nombre} ({user?.rol})
            </span>
            <button onClick={logout} className="logout-btn">Cerrar Sesion</button>
          </div>
        </header>
    );
};

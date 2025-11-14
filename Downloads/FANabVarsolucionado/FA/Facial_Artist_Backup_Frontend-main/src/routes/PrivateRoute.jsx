import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/authcontext';

export const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuthContext();

  if (!user) return <Navigate to="/" />;
    if (allowedRoles && !allowedRoles.includes(user.rol)) return <Navigate to="/bienvenido" />;

    return children;
  };


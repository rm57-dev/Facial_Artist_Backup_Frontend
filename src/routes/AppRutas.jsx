// import { Routes, Route } from "react-router-dom";
// import { Login } from "../components/login/login";
// import { Registro } from "../components/registro/registro";
// import { Principal } from "../pages/Principal";
// import { UsuariosPagina } from "../pages/UsuariosPagina";
// import { RolesPagina } from "../pages/RolesPagina";
// import { PermisosPagina } from "../pages/PermisosPagina";
// import { RolPermisoPagina } from "../pages/RolPermisoPagina";
// import { Bienvenido } from "../pages/Bienvenido";
// import { useAuthContext } from "../context/authcontext";
// import { AdminDashboard } from "../components/Admin/AdminDashboard";


// const PrivateRoute = ({ children, allowedRoles }) => {
//   const { user } = useAuthContext();

//   if (!user) return <Login/>;
//   if (allowedRoles && !allowedRoles.includes(user.rol)) return <Bienvenido/>;

//   return children;
// };

// export const AppRutas = () => (
//   <Routes>
//     <Route path="/" element={<Login/>} />
//     <Route path="/registro" element={<Registro/>} />

//     <Route
//     path="/principal"
//     element={
//       <PrivateRoute allowedRoles={["Administrador"]}>
//       <Principal/>
//       </PrivateRoute>
//     }
//     />
//     <Route
//     path="/usuarios"
//     element={
//       <PrivateRoute allowedRoles={["Administrador"]}>
//       <UsuariosPagina/>
//       </PrivateRoute>
//     }
//     />
//     <Route
//     path="/roles"
//     element={
//       <PrivateRoute allowedRoles={["Administrador"]}>
//       <RolesPagina/>
//       </PrivateRoute>
//     }
//     />
//     <Route
//     path="/permisos"
//     element={
//       <PrivateRoute allowedRoles={["Administrador"]}>
//       <PermisosPagina/>
//       </PrivateRoute>
//     }
//     />
//     <Route
//     path="/rol-permisos"
//     element={
//       <PrivateRoute allowedRoles={["Administrador"]}>
//       <RolPermisoPagina/>
//       </PrivateRoute>
//     }
//     />

//     <Route
//     path="/bienvenido"
//     element={
//       <PrivateRoute>
//       <Bienvenido/>
//       </PrivateRoute>
//     }
//     />

//         <Route
//       path="/admin/dashboard"
//       element={
//         <PrivateRoute allowedRoles={["Administrador"]}>
//           <AdminDashboard />
//         </PrivateRoute>
//       }
//     />

//   </Routes>

  
// )


import { Routes, Route } from "react-router-dom";
import { Login } from "../components/login/login";
import { Registro } from "../components/registro/registro";
import { Principal } from "../pages/Principal";
import { UsuariosPagina } from "../pages/UsuariosPagina";
import { RolesPagina } from "../pages/RolesPagina";
import { PermisosPagina } from "../pages/PermisosPagina";
import { RolPermisoPagina } from "../pages/RolPermisoPagina";
import { Bienvenido } from "../pages/Bienvenido";
import { useAuthContext } from "../context/authcontext";
import { AdminDashboard } from "../components/Admin/AdminDashboard";
import { ListaDeCitas } from "../components/Admin/ListaDeCitas"; // 
import { AgendarCita } from "../components/agendamiento/AgendarCita"; //

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuthContext();

  if (!user) return <Login />;
  if (allowedRoles && !allowedRoles.includes(user.rol)) return <Bienvenido />;

  return children;
};

export const AppRutas = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/registro" element={<Registro />} />

    <Route
      path="/principal"
      element={
        <PrivateRoute allowedRoles={["Administrador"]}>
          <Principal />
        </PrivateRoute>
      }
    />
    <Route
      path="/usuarios"
      element={
        <PrivateRoute allowedRoles={["Administrador"]}>
          <UsuariosPagina />
        </PrivateRoute>
      }
    />
    <Route
      path="/roles"
      element={
        <PrivateRoute allowedRoles={["Administrador"]}>
          <RolesPagina />
        </PrivateRoute>
      }
    />
    <Route
      path="/permisos"
      element={
        <PrivateRoute allowedRoles={["Administrador"]}>
          <PermisosPagina />
        </PrivateRoute>
      }
    />
    <Route
      path="/rol-permisos"
      element={
        <PrivateRoute allowedRoles={["Administrador"]}>
          <RolPermisoPagina />
        </PrivateRoute>
      }
    />

    <Route
      path="/bienvenido"
      element={
        <PrivateRoute>
          <Bienvenido />
        </PrivateRoute>
      }
    />

    <Route
      path="/admin/dashboard"
      element={
        <PrivateRoute allowedRoles={["Administrador"]}>
          <AdminDashboard />
        </PrivateRoute>
      }
    />

    {/* ✅ Nueva ruta para ListaDeCitas */}
    <Route
      path="/admin/lista-de-citas"
      element={
        <PrivateRoute allowedRoles={["Administrador"]}>
          <ListaDeCitas />
        </PrivateRoute>
      }
    />
    <Route
  path="/agendamiento"
  element={
    <PrivateRoute allowedRoles={["Administrador"]}>
      <AgendarCita />
    </PrivateRoute>
  }
    />
  </Routes>
);

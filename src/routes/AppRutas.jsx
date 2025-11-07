// import { Routes, Route, Navigate } from "react-router-dom";
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
// import { ListaDeCitas } from "../components/Admin/ListaDeCitas";
// import { AgendarCita } from "../components/agendamiento/AgendarCita";

// // ✅ Importar componentes de layout
// import  Header  from "../components/layout/Header"; // Usa export nombrado, correcto
// import Hero from "../components/layout/Hero"; // default
// import Services from "../components/layout/Services"; // default
// import Gallery from "../components/layout/Gallery"; // default
// import { NewTestimonials } from "../components/layout/NewTestimonials"; // Asegúrate de que esté exportado como named
// import { Location } from "../components/layout/Location"; // named export
// import Footer from "../components/layout/Footer"; // default

// // 🔐 Rutas protegidas
// const PrivateRoute = ({ children, allowedRoles }) => {
//   const { user } = useAuthContext();

//   if (!user) return <Login />;
//   if (allowedRoles && !allowedRoles.includes(user.rol)) return <Bienvenido />;

//   return children;
// };

// // 🌟 Landing page pública
// const LandingLayout = () => (
//   <>
//     <Header />
//     <Hero />
//     <Services />
//     <Gallery />
//     <NewTestimonials />
//     <Location />
//     <Footer />
//   </>
// );

// export const AppRutas = () => (
//   <Routes>
//     {/* Página pública */}
//     <Route path="/" element={<LandingLayout />} />

//     {/* Login y registro */}
//     <Route path="/login" element={<Login />} />
//     <Route path="/registro" element={<Registro />} />

//     {/* Rutas privadas solo para administradores */}
//     <Route
//       path="/principal"
//       element={
//         <PrivateRoute allowedRoles={["Administrador"]}>
//           <Principal />
//         </PrivateRoute>
//       }
//     />
//     <Route
//       path="/usuarios"
//       element={
//         <PrivateRoute allowedRoles={["Administrador"]}>
//           <UsuariosPagina />
//         </PrivateRoute>
//       }
//     />
//     <Route
//       path="/roles"
//       element={
//         <PrivateRoute allowedRoles={["Administrador"]}>
//           <RolesPagina />
//         </PrivateRoute>
//       }
//     />
//     <Route
//       path="/permisos"
//       element={
//         <PrivateRoute allowedRoles={["Administrador"]}>
//           <PermisosPagina />
//         </PrivateRoute>
//       }
//     />
//     <Route
//       path="/rol-permisos"
//       element={
//         <PrivateRoute allowedRoles={["Administrador"]}>
//           <RolPermisoPagina />
//         </PrivateRoute>
//       }
//     />

//     {/* Bienvenido */}
//     <Route
//       path="/bienvenido"
//       element={
//         <PrivateRoute>
//           <Bienvenido />
//         </PrivateRoute>
//       }
//     />

//     {/* Panel admin */}
//     <Route
//       path="/admin/dashboard"
//       element={
//         <PrivateRoute allowedRoles={["Administrador"]}>
//           <AdminDashboard />
//         </PrivateRoute>
//       }
//     />

//     {/* Lista de citas */}
//     <Route
//       path="/admin/lista-de-citas"
//       element={
//         <PrivateRoute allowedRoles={["Administrador"]}>
//           <ListaDeCitas />
//         </PrivateRoute>
//       }
//     />
//     <Route
//       path="/agendamiento"
//       element={
//         <PrivateRoute allowedRoles={["Administrador"]}>
//           <AgendarCita />
//         </PrivateRoute>
//       }
//     />

//     {/* Ruta por defecto */}
//     <Route path="*" element={<Navigate to="/" replace />} />
//   </Routes>
// );

import { Routes, Route, Navigate } from "react-router-dom";
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
import { ListaDeCitas } from "../components/Admin/ListaDeCitas";
import { AgendarCita } from "../components/agendamiento/AgendarCita";

// ✅ Importar los layouts y headers correctos
import Header from "../components/layout/Header"; // Header público
import { Header as Header2 } from "../components/layout/Header2"; // Header privado (admin)
import Hero from "../components/layout/Hero";
import Services from "../components/layout/Services";
import Gallery from "../components/layout/Gallery";
import { NewTestimonials } from "../components/layout/NewTestimonials";
import { Location } from "../components/layout/Location";
import Footer from "../components/layout/Footer";

// 🔐 Rutas protegidas
const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuthContext();

  if (!user) return <Login />;
  if (allowedRoles && !allowedRoles.includes(user.rol)) return <Bienvenido />;

  // ✅ Header2 solo se renderiza cuando hay sesión
  return (
    <>
      <Header2 />
      {children}
    </>
  );
};

// 🌟 Landing pública (la que aparece al abrir el sitio)
const LandingLayout = () => (
  <>
    <Header /> {/* Header público (sin sesión) */}
    <Hero />
    <Services />
    <Gallery />
    <NewTestimonials />
    <Location />
    <Footer />
  </>
);

// 🌟 Layout público para el agendamiento
const PublicLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

// 🚀 Definición de rutas
export const AppRutas = () => (
  <Routes>
    {/* Página pública (landing completa) */}
    <Route path="/" element={<LandingLayout />} />

    {/* Login y registro */}
    <Route path="/login" element={<Login />} />
    <Route path="/registro" element={<Registro />} />

    {/* ✅ Agendamiento público */}
    <Route
      path="/agendamiento"
      element={
        <PublicLayout>
          <AgendarCita />
        </PublicLayout>
      }
    />

    {/* Rutas privadas solo para administradores */}
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

    {/* Bienvenido */}
    <Route
      path="/bienvenido"
      element={
        <PrivateRoute>
          <Bienvenido />
        </PrivateRoute>
      }
    />

    {/* Panel de administración */}
    <Route
      path="/admin/dashboard"
      element={
        <PrivateRoute allowedRoles={["Administrador"]}>
          <AdminDashboard />
        </PrivateRoute>
      }
    />

    {/* Lista de citas */}
    <Route
      path="/admin/lista-de-citas"
      element={
        <PrivateRoute allowedRoles={["Administrador"]}>
          <ListaDeCitas />
        </PrivateRoute>
      }
    />

    {/* Ruta por defecto */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

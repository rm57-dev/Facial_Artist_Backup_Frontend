
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
import { ClientDashboard } from "../components/client/ClientDashboard";
import { AdminLayout } from "../components/layout/AdminLayout";


// ✅ Importar los layouts y headers correctos
import Header from "../components/layout/Header"; // Header público
import { Header2 } from "../components/layout/Header2"; // Header privado (admin)
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

  if (allowedRoles && !allowedRoles.includes(user.rol))
    return <Bienvenido />;

  return children;
};



// 🌟 Landing pública (la que aparece al abrir el sitio)
const LandingLayout = () => {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <Gallery />
      <NewTestimonials />
      <Location />
      <Footer />
    </>
  );
};



// 🌟 Layout público para el agendamiento
const PublicLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};



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

    <Route
  path="/client-dashboard"
  element={
    <PrivateRoute allowedRoles={["Usuario"]}>
      <ClientDashboard />
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

    {/* ✅ RUTAS ADMIN SEPARADAS DEL LAYOUT PÚBLICO */}
<Route
  path="/admin"
  element={
    <PrivateRoute allowedRoles={["Administrador"]}>
      <AdminLayout /> {/* Ahora este layout tiene su propio Header2 */}
    </PrivateRoute>
  }
>
  <Route path="dashboard" element={<AdminDashboard />} />
  <Route path="lista-de-citas" element={<ListaDeCitas />} />
  <Route path="usuarios" element={<UsuariosPagina />} />
  <Route path="roles" element={<RolesPagina />} />
  <Route path="permisos" element={<PermisosPagina />} />
  <Route path="rol-permisos" element={<RolPermisoPagina />} />
  <Route index element={<Principal />} />
</Route>


    {/* Ruta por defecto */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

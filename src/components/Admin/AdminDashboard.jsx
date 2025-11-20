import React, { useState } from "react";
import {
  Calendar,
  Users,
  Clock,
  Settings,
  RefreshCw,
  ExternalLink,
  LogOut,
  Bell,
  Scissors
} from "lucide-react";

import "./AdminDashboard.css";

import { CalendarView } from "./CalendarView";
import { AppointmentsList } from "./AppointmentsList";
import { ClientsManager } from "./ClientsManager";
import { ReminderSettings } from "./ReminderSettings";

// MODALES
import { ProfessionalsModal } from "./ProfessionalsModal.jsx";
import { ServiceModal } from "./ServiceModal.jsx";

export function AdminDashboard({ onClose }) {
  const [activeView, setActiveView] = useState("calendar");

  // Estado modal Profesionales
  const [openProfessionalsModal, setOpenProfessionalsModal] = useState(false);

  // Estado modal Servicios
  const [openServiceModal, setOpenServiceModal] = useState(false);

  const [isGoogleCalendarSynced, setIsGoogleCalendarSynced] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const stats = {
    todayAppointments: 8,
    weekAppointments: 32,
    monthRevenue: 15000000,
    activeClients: 127,
  };

  const handleGoogleCalendarSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setIsGoogleCalendarSynced(true);
    }, 2000);
  };

  const formatCurrency = (amount) =>
    amount.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });

  return (
    <div className="admin-container">
      {/* HEADER */}
      <header className="admin-header">
        <div className="admin-left">
          <div className="icon-circle">
            <Settings className="icon-white" size={20} />
          </div>
          <div>
            <h1>Panel de Administración</h1>
            <p>Natalia Salazar Artist Studio</p>
          </div>

          <div className="google-sync">
            {isGoogleCalendarSynced ? (
              <span className="sync-success">
                <span className="dot" /> Google Calendar sincronizado
              </span>
            ) : (
              <button
                onClick={handleGoogleCalendarSync}
                disabled={isSyncing}
                className="btn-outline"
              >
                {isSyncing ? (
                  <>
                    <div className="spinner" />
                    Sincronizando...
                  </>
                ) : (
                  <>
                    <RefreshCw size={14} /> Conectar Google Calendar
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="admin-right">
          {isGoogleCalendarSynced && (
            <button
              className="btn-outline"
              onClick={() =>
                window.open("https://calendar.google.com", "_blank")
              }
            >
              <ExternalLink size={14} /> Ver en Google
            </button>
          )}
          <button className="btn-logout" onClick={onClose}>
            <LogOut size={14} /> Cerrar Sesión
          </button>
        </div>
      </header>

      {/* TABS */}
      <div className="tabs-container">
        <div className="tabs">
          <button
            className={activeView === "calendar" ? "tab active" : "tab"}
            onClick={() => setActiveView("calendar")}
          >
            <Calendar size={14} /> Calendario
          </button>

          <button
            className={activeView === "appointments" ? "tab active" : "tab"}
            onClick={() => setActiveView("appointments")}
          >
            <Clock size={14} /> Lista de Citas
          </button>

          <button
            className={activeView === "clients" ? "tab active" : "tab"}
            onClick={() => setActiveView("clients")}
          >
            <Users size={14} /> Clientas
          </button>

          <button
            className={activeView === "reminders" ? "tab active" : "tab"}
            onClick={() => setActiveView("reminders")}
          >
            <Bell size={14} /> Recordatorios
          </button>

          {/* BOTÓN PROFESIONALES */}
          <button
            className="tab"
            onClick={() => setOpenProfessionalsModal(true)}
          >
            <Settings size={14} /> Profesionales
          </button>

          {/* BOTÓN SERVICIOS */}
          <button
            className="tab"
            onClick={() => setOpenServiceModal(true)}
          >
            <Scissors size={14} /> Servicios
          </button>
        </div>

        <div className="tab-content">
          {activeView === "calendar" && <CalendarView />}
          {activeView === "appointments" && <AppointmentsList />}
          {activeView === "clients" && <ClientsManager />}
          {activeView === "reminders" && <ReminderSettings />}
        </div>
      </div>

      {/* MODAL PROFESIONALES */}
      <ProfessionalsModal
        open={openProfessionalsModal}
        onOpenChange={setOpenProfessionalsModal}
      />

      {/* MODAL SERVICIOS */}
<ServiceModal
  isOpen={openServiceModal}
  onClose={() => setOpenServiceModal(false)}
  onSave={(data) => {
    console.log("Nuevo servicio guardado:", data);
  }}
/>

    </div>
  );
}
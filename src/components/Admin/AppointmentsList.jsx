import React, { useState, useEffect } from "react";
import { Calendar, Clock, User, Edit, Trash2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Badge } from "../ui/Admin/Badge";
import { Button } from "../ui/Admin/button";
import { Input } from "../ui/Admin/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { TrafficLight } from "./TrafficLight";
import "./AppointmentsList.css";

export function AppointmentsList() {
  // API
  const API = (() => {
    if (typeof import.meta !== "undefined" && import.meta.env) {
      return import.meta.env.VITE_API_URL || "http://localhost:3000";
    }
    return "http://localhost:3000";
  })();

  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // GET Citas
  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const resp = await fetch(`${API}/api/citas`);
        if (!resp.ok) throw new Error("Error al obtener citas");
        const data = await resp.json();
        setAppointments(
          data.map((cita) => ({
            id: cita.id_cita.toString(),
            time: cita.hora?.slice(0, 5) || "00:00",
            date: cita.fecha,
            status: cita.estado,
            nota: cita.nota,
            clientName: "Cliente",
            clientPhone: "",
            service: "",
            price: 0,
            trafficLight: "green",
            duration: 60,
            notes: cita.nota || "",
          }))
        );
      } catch (err) {
        console.error("Error:", err);
      }
    };
    fetchCitas();
  }, [API]);

  // 🔥 CORREGIDO — Confirmar cita
  const handleConfirm = async (id) => {
    try {
      const resp = await fetch(`${API}/api/citas/confirmar/${id}`, {
        method: "PUT",
      });

      if (!resp.ok) throw new Error("Error al confirmar cita");
      const updated = await resp.json();

      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === id ? { ...apt, status: "confirmada" } : apt
        )
      );

      alert("Cita confirmada y correo enviado al cliente.");
    } catch (err) {
      console.error(err);
    }
  };

  // Filtros
  const filteredAppointments = appointments
    .filter((a) => {
      const matchName = a.clientName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchService = a.service
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchStatus = filterStatus === "all" || a.status === filterStatus;
      return (matchName || matchService) && matchStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA - dateB;
    });

  // Colores
  const getStatusColor = (status) => {
    switch (status) {
      case "confirmada":
        return "status-green";
      case "pendiente":
        return "status-yellow";
      case "completada":
        return "status-blue";
      case "cancelada":
        return "status-red";
      default:
        return "status-gray";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "confirmada":
        return "Confirmada";
      case "pendiente":
        return "Pendiente";
      case "completada":
        return "Completada";
      case "cancelada":
        return "Cancelada";
      default:
        return status;
    }
  };

  const handleTrafficLightChange = (id, color) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, trafficLight: color } : apt))
    );
  };

  // DELETE Cita
  const handleDelete = async (id) => {
    try {
      const resp = await fetch(`${API}/api/citas/${id}`, { method: "DELETE" });
      if (!resp.ok) throw new Error("Error al eliminar cita");
      setAppointments((prev) => prev.filter((apt) => apt.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Editar
  const openEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEditDialogOpen(true);
  };

  // Guardar edición
  const handleSaveEdit = async (updatedFields) => {
    if (!selectedAppointment) return;
    const id = selectedAppointment.id;

    const payload = {
      fecha: updatedFields.date || selectedAppointment.date,
      hora: updatedFields.time || selectedAppointment.time,
      nota: updatedFields.notes || selectedAppointment.notes,
      estado: updatedFields.status || selectedAppointment.status,
    };

    try {
      const resp = await fetch(`${API}/api/citas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) throw new Error("Error al actualizar cita");
      const updated = await resp.json();

      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === id
            ? {
                ...apt,
                date: updated.fecha,
                time: updated.hora?.slice(0, 5) || apt.time,
                notes: updated.nota || apt.notes,
                status: updated.estado || apt.status,
              }
            : apt
        )
      );
      setIsEditDialogOpen(false);
      setSelectedAppointment(null);
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-ES", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <div className="appointments-container">
      <Card className="border-rose-pastel">
        <CardHeader>
          <CardTitle className="text-black-soft font-heading">
            Gestión de Citas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="filters-container">
            <Input
              placeholder="Buscar por cliente o servicio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-rose-pastel focus:border-gold"
            />
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="border-rose-pastel focus:border-gold">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="confirmada">Confirmadas</SelectItem>
                <SelectItem value="pendiente">Pendientes</SelectItem>
                <SelectItem value="completada">Completadas</SelectItem>
                <SelectItem value="cancelada">Canceladas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="appointments-list">
        {filteredAppointments.map((appointment) => (
          <Card key={appointment.id} className="appointment-card">
            <CardContent className="p-6">
              <div className="appointment-header">
                <div className="appointment-info">
                  <TrafficLight
                    color={appointment.trafficLight}
                    onChange={(color) =>
                      handleTrafficLightChange(appointment.id, color)
                    }
                  />
                  <div className="details">
                    <div className="name-row">
                      <h3>{appointment.clientName}</h3>
                      <Badge className={getStatusColor(appointment.status)}>
                        {getStatusText(appointment.status)}
                      </Badge>
                    </div>
                    <div className="sub-info">
                      <span>
                        <Calendar size={14} /> {formatDate(appointment.date)}
                      </span>
                      <span>
                        <Clock size={14} /> {appointment.time} (
                        {appointment.duration} min)
                      </span>
                      <span>
                        <User size={14} /> {appointment.service}
                      </span>
                    </div>
                    {appointment.notes && (
                      <p className="notes">{appointment.notes}</p>
                    )}
                  </div>
                </div>

                <div className="appointment-actions">
                  <p className="price">{formatPrice(appointment.price)}</p>
                  <p className="phone">{appointment.clientPhone}</p>

                  {/* ✔ BOTÓN CONFIRMAR */}
                  {appointment.status === "pendiente" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="btn-green-outline"
                      onClick={() => handleConfirm(appointment.id)}
                    >
                      Confirmar
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    className="btn-gold-outline"
                    onClick={() => openEdit(appointment)}
                  >
                    <Edit size={14} /> Editar
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="btn-red-outline"
                    onClick={() => handleDelete(appointment.id)}
                  >
                    <Trash2 size={14} /> Eliminar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="border-rose-pastel">
          <DialogHeader>
            <DialogTitle>Reagendar Cita</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="edit-form">
              <Label>Cliente</Label>
              <Input value={selectedAppointment.clientName} disabled />

              <Label>Nueva Fecha</Label>
              <Input
                type="date"
                defaultValue={selectedAppointment.date}
                onChange={(e) =>
                  setSelectedAppointment({
                    ...selectedAppointment,
                    date: e.target.value,
                  })
                }
              />

              <Label>Nueva Hora</Label>
              <Input
                type="time"
                defaultValue={selectedAppointment.time}
                onChange={(e) =>
                  setSelectedAppointment({
                    ...selectedAppointment,
                    time: e.target.value,
                  })
                }
              />

              <Label>Notas</Label>
              <Input
                placeholder="Razón del cambio..."
                defaultValue={selectedAppointment.notes}
                onChange={(e) =>
                  setSelectedAppointment({
                    ...selectedAppointment,
                    notes: e.target.value,
                  })
                }
              />

              <div className="dialog-actions">
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  className="btn-gold"
                  onClick={() => handleSaveEdit(selectedAppointment)}
                >
                  Guardar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

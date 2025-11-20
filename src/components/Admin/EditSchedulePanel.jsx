import { useState } from "react";
import { Button } from "../ui/Admin/button.jsx";
import { Input } from "../ui/Admin/input.jsx";
import { Label } from "../ui/label.jsx";
import { Textarea } from "../ui/Admin/Textarea.jsx";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select.jsx";
import "./ProfessionalsModal.css";

export function EditSchedulePanel({ professional }) {
  const [schedule, setSchedule] = useState({
    monday: { enabled: true, startTime: "09:00", endTime: "18:00" },
    tuesday: { enabled: true, startTime: "09:00", endTime: "18:00" },
    wednesday: { enabled: true, startTime: "09:00", endTime: "18:00" },
    thursday: { enabled: true, startTime: "09:00", endTime: "18:00" },
    friday: { enabled: true, startTime: "09:00", endTime: "18:00" },
    saturday: { enabled: false, startTime: "09:00", endTime: "14:00" },
    sunday: { enabled: false, startTime: "09:00", endTime: "14:00" },
  });

  const [selectedAppointment, setSelectedAppointment] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [reassignDate, setReassignDate] = useState("");
  const [reassignTime, setReassignTime] = useState("");

  const weekDays = [
    { id: "monday", label: "Lunes" },
    { id: "tuesday", label: "Martes" },
    { id: "wednesday", label: "Miércoles" },
    { id: "thursday", label: "Jueves" },
    { id: "friday", label: "Viernes" },
    { id: "saturday", label: "Sábado" },
    { id: "sunday", label: "Domingo" },
  ];

  const mockAppointments = [
    { id: "1", client: "María González", date: "2025-11-12", time: "10:00", service: "Maquillaje Profesional" },
    { id: "2", client: "Laura Martínez", date: "2025-11-13", time: "14:00", service: "Tratamiento Facial" },
    { id: "3", client: "Ana López", date: "2025-11-14", time: "11:00", service: "Diseño de Cejas" },
  ];

  const toggleDay = (dayId) => {
    setSchedule({
      ...schedule,
      [dayId]: { ...schedule[dayId], enabled: !schedule[dayId].enabled },
    });
  };

  const updateTime = (dayId, type, value) => {
    setSchedule({
      ...schedule,
      [dayId]: { ...schedule[dayId], [type]: value },
    });
  };

  const handleSaveSchedule = () => {
    console.log("Guardando horario:", schedule);
    alert("Horario guardado exitosamente");
  };

  const handleCancelAppointment = () => {
    if (!selectedAppointment) return;
    alert("Cita cancelada");
    setSelectedAppointment("");
    setCancelReason("");
  };

  const handleReassignAppointment = () => {
    if (!selectedAppointment || !reassignDate || !reassignTime) return;
    alert("Cita reasignada");
    setSelectedAppointment("");
    setReassignDate("");
    setReassignTime("");
  };

  return (
    <div className="space-y-6">
      {/* Disponibilidad Semanal */}
      <div className="bg-[#F6F1E9] p-6 border border-[#E8D4A0]">
        <h3 className="text-[#5C5C5C] mb-4">Disponibilidad Semanal</h3>
        <div className="space-y-3">
          {weekDays.map((day) => (
            <div key={day.id} className="flex items-center gap-4">
              <div className="flex items-center gap-2 w-32">
                <input
                  type="checkbox"
                  id={day.id}
                  checked={schedule[day.id].enabled}
                  onChange={() => toggleDay(day.id)}
                  className="w-4 h-4 border-[#E8D4A0] text-[#D4AF37]"
                />
                <Label className="text-sm text-[#5C5C5C] cursor-pointer">
                  {day.label}
                </Label>
              </div>

              {schedule[day.id].enabled ? (
                <div className="flex items-center gap-2 flex-1">
                  <Input
                    type="time"
                    value={schedule[day.id].startTime}
                    onChange={(e) => updateTime(day.id, "startTime", e.target.value)}
                  />
                  <span className="text-[#A8B89F]">a</span>
                  <Input
                    type="time"
                    value={schedule[day.id].endTime}
                    onChange={(e) => updateTime(day.id, "endTime", e.target.value)}
                  />
                </div>
              ) : (
                <span className="text-sm text-[#A8B89F] flex-1">No disponible</span>
              )}
            </div>
          ))}
        </div>

        <Button className="w-full mt-6 bg-[#D4AF37] text-white" onClick={handleSaveSchedule}>
          Guardar Cambios
        </Button>
      </div>

      {/* Cancelar Cita */}
      <div className="bg-[#F6F1E9] p-6 border border-[#E8D4A0]">
        <h3 className="text-[#5C5C5C] mb-4">Cancelar Cita</h3>

        <div className="space-y-2">
          <Label className="text-[#5C5C5C]">Seleccionar Cita</Label>
          <Select value={selectedAppointment} onValueChange={setSelectedAppointment}>
            <SelectTrigger className="border-[#E8D4A0]">
              <SelectValue placeholder="Selecciona una cita" />
            </SelectTrigger>
            <SelectContent>
              {mockAppointments.map((apt) => (
                <SelectItem key={apt.id} value={apt.id}>
                  {apt.client} - {apt.date} {apt.time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-[#5C5C5C]">Motivo (opcional)</Label>
          <Textarea
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            placeholder="Motivo de cancelación"
            rows={2}
          />
        </div>

        <Button
          onClick={handleCancelAppointment}
          disabled={!selectedAppointment}
          className="w-full border border-[#A8B89F]"
          variant="outline"
        >
          Cancelar Cita
        </Button>
      </div>

      {/* Reasignar Cita */}
      <div className="bg-[#F6F1E9] p-6 border border-[#E8D4A0]">
        <h3 className="text-[#5C5C5C] mb-4">Reasignar Cita</h3>

        <div className="space-y-2">
          <Label>Seleccionar Cita</Label>
          <Select value={selectedAppointment} onValueChange={setSelectedAppointment}>
            <SelectTrigger className="border-[#E8D4A0]">
              <SelectValue placeholder="Selecciona una cita" />
            </SelectTrigger>
            <SelectContent>
              {mockAppointments.map((apt) => (
                <SelectItem key={apt.id} value={apt.id}>
                  {apt.client} - {apt.date} {apt.time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Nueva Fecha</Label>
            <Input type="date" value={reassignDate} onChange={(e) => setReassignDate(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Nueva Hora</Label>
            <Input type="time" value={reassignTime} onChange={(e) => setReassignTime(e.target.value)} />
          </div>
        </div>

        <Button
          onClick={handleReassignAppointment}
          disabled={!selectedAppointment || !reassignDate || !reassignTime}
          className="w-full bg-[#D4AF37] text-white"
        >
          Reasignar Cita
        </Button>
      </div>
    </div>
  );
}
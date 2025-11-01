import React from "react";
//import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
//import { Button } from "../ui/button";
//import { Card, CardContent } from "../ui/card";
import { X, CalendarDays, Clock, Trash2, Save, RefreshCw } from "lucide-react";
import "./AppointmentEditModal.css";

export function AppointmentEditModal({
  appointment,
  isOpen,
  onClose,
  onSave,
  onDelete,
  onReschedule,
}) {
  if (!appointment) return null;

  const handleSave = () => {
    onSave(appointment);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="editmodal-content">
        <DialogHeader>
          <DialogTitle className="editmodal-title">
            Editar Cita
          </DialogTitle>
        </DialogHeader>

        <Card className="editmodal-card">
          <CardContent>
            <div className="editmodal-section">
              <div className="editmodal-row">
                <div>
                  <label>Cliente</label>
                  <input
                    type="text"
                    value={appointment.clientName}
                    readOnly
                    className="editmodal-input"
                  />
                </div>
                <div>
                  <label>Servicio</label>
                  <input
                    type="text"
                    value={appointment.service}
                    readOnly
                    className="editmodal-input"
                  />
                </div>
              </div>

              <div className="editmodal-row">
                <div>
                  <label>
                    <CalendarDays size={16} /> Fecha
                  </label>
                  <input
                    type="text"
                    value={appointment.date}
                    readOnly
                    className="editmodal-input"
                  />
                </div>
                <div>
                  <label>
                    <Clock size={16} /> Hora
                  </label>
                  <input
                    type="text"
                    value={appointment.time}
                    readOnly
                    className="editmodal-input"
                  />
                </div>
              </div>

              <div className="editmodal-notes">
                <label>Notas</label>
                <textarea
                  defaultValue={appointment.notes || ""}
                  placeholder="Agregar observaciones..."
                />
              </div>
            </div>

            <div className="editmodal-actions">
              <Button
                variant="outline"
                className="btn-gold-outline"
                onClick={() => onReschedule(appointment.id)}
              >
                <RefreshCw size={16} className="mr-2" /> Reprogramar
              </Button>
              <Button
                variant="outline"
                className="btn-red-outline"
                onClick={() => onDelete(appointment.id)}
              >
                <Trash2 size={16} className="mr-2" /> Eliminar
              </Button>
              <Button className="btn-gold" onClick={handleSave}>
                <Save size={16} className="mr-2" /> Guardar
              </Button>
            </div>
          </CardContent>
        </Card>

        <button className="editmodal-close" onClick={onClose}>
          <X size={20} />
        </button>
      </DialogContent>
    </Dialog>
  );
}

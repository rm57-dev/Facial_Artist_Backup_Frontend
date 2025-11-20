import { useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog.jsx";
import { Button } from "../ui/Admin/button.jsx";
import { ArrowLeft, Settings, Calendar, Clock } from "lucide-react";
import { EditSchedulePanel } from "./EditSchedulePanel.jsx";
import "./ProfessionalsModal.css";

const professionals = [
  {
    id: "1",
    name: "Natalia Salazar",
    specialty: "Maquillaje Profesional",
    initials: "NS",
    color: "#D4AF37",
  },
  {
    id: "2",
    name: "Sofía Torres",
    specialty: "Tratamientos Faciales",
    initials: "ST",
    color: "#A8B89F",
  },
];

export function ProfessionalsModal({ open, onOpenChange }) {
  const [selectedProfessional, setSelectedProfessional] = useState(null);

  const handleBack = () => {
    setSelectedProfessional(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="modal-container">
        {/* Header */}
        <div className="modal-header">
          {selectedProfessional && (
            <Button className="back-btn" onClick={handleBack} variant="ghost">
              <ArrowLeft className="icon" />
            </Button>
          )}

          <div className="header-content">
            <div className="header-title-row">
              <div className="header-icon">
                {selectedProfessional ? (
                  <Calendar className="icon-white" />
                ) : (
                  <Settings className="icon-white" />
                )}
              </div>

              <h2 className="modal-title">
                {selectedProfessional ? "Gestión de Horario" : "Gestión de Profesionales"}
              </h2>
            </div>

            <p className="modal-description">
              {selectedProfessional
                ? `Configura la disponibilidad y horarios de ${selectedProfessional.name}`
                : "Administra horarios, disponibilidad y citas del equipo profesional"}
            </p>
          </div>
        </div>

        {/* Lista o panel */}
        <div className="modal-body">
          {!selectedProfessional ? (
            <div className="professional-list">
              {professionals.map((p) => (
                <div key={p.id} className="professional-card">
                  <div className="avatar-section">
                    <div className="avatar" style={{ backgroundColor: p.color }}>
                      {p.initials}
                    </div>

                    <span className="status-dot" />
                  </div>

                  <div className="professional-info">
                    <h3 className="professional-name">{p.name}</h3>

                    <p className="professional-specialty">
                      <Clock className="clock-icon" /> {p.specialty}
                    </p>

                    <div className="availability">
                      <span className="tag tag-available">Disponible</span>
                      <span>•</span>
                      <span>8 citas hoy</span>
                    </div>
                  </div>

                  <Button
                    className="edit-btn"
                    onClick={() => setSelectedProfessional(p)}
                  >
                    <Settings className="edit-icon" />
                    Editar Horario
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="schedule-panel">
              <EditSchedulePanel professional={selectedProfessional} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
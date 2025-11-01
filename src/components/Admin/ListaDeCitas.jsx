import React, { useState } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import "./ListaDeCitas.css";

export function ListaDeCitas() {
  const [citas, setCitas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [nuevaCita, setNuevaCita] = useState({
    fecha: "",
    hora: "",
    nota: "",
    estado: "pendiente",
  });

  const abrirModal = (index = null) => {
    if (index !== null) {
      setEditingIndex(index);
      setNuevaCita(citas[index]);
    } else {
      setEditingIndex(null);
      setNuevaCita({ fecha: "", hora: "", nota: "", estado: "pendiente" });
    }
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
  };

  const guardarCita = () => {
    if (editingIndex !== null) {
      const updated = [...citas];
      updated[editingIndex] = nuevaCita;
      setCitas(updated);
    } else {
      setCitas([...citas, nuevaCita]);
    }
    cerrarModal();
  };

  const eliminarCita = (index) => {
    setCitas(citas.filter((_, i) => i !== index));
  };

  return (
    <div className="lista-citas-container">
      <h2 className="titulo">📋 Lista de Citas</h2>

      <button className="btn-add" onClick={() => abrirModal()}>
        <Plus size={18} /> Nueva Cita
      </button>

      {citas.length === 0 ? (
        <p className="sin-citas">No hay citas registradas todavía.</p>
      ) : (
        <table className="tabla-citas">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Nota</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((cita, index) => (
              <tr key={index}>
                <td>{cita.fecha}</td>
                <td>{cita.hora}</td>
                <td>{cita.nota}</td>
                <td>
                  <span className={`estado ${cita.estado}`}>
                    {cita.estado}
                  </span>
                </td>
                <td className="acciones">
                  <button
                    className="btn-edit"
                    onClick={() => abrirModal(index)}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => eliminarCita(index)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editingIndex !== null ? "Editar Cita" : "Nueva Cita"}</h3>
              <button className="btn-close" onClick={cerrarModal}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <label>Fecha:</label>
              <input
                type="date"
                value={nuevaCita.fecha}
                onChange={(e) =>
                  setNuevaCita({ ...nuevaCita, fecha: e.target.value })
                }
              />

              <label>Hora:</label>
              <input
                type="time"
                value={nuevaCita.hora}
                onChange={(e) =>
                  setNuevaCita({ ...nuevaCita, hora: e.target.value })
                }
              />

              <label>Nota:</label>
              <textarea
                value={nuevaCita.nota}
                onChange={(e) =>
                  setNuevaCita({ ...nuevaCita, nota: e.target.value })
                }
                placeholder="Escribe una nota..."
              />

              <label>Estado:</label>
              <select
                value={nuevaCita.estado}
                onChange={(e) =>
                  setNuevaCita({ ...nuevaCita, estado: e.target.value })
                }
              >
                <option value="pendiente">Pendiente</option>
                <option value="completada">Completada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>

            <div className="modal-footer">
              <button className="btn-cancelar" onClick={cerrarModal}>
                Cancelar
              </button>
              <button className="btn-guardar" onClick={guardarCita}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import "./usuario.css"

export const ModalUsuario = ({ onClose, onSave, usuarioSeleccionado, roles }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const [idRol, setIdRol] = useState("");

  useEffect(() => {
    if (usuarioSeleccionado) {
      setNombre(usuarioSeleccionado.nombre);
      setEmail(usuarioSeleccionado.email);
      setClave(usuarioSeleccionado.clave);
      setIdRol(usuarioSeleccionado.idRol);
      setClave("");
    } else {
      setNombre("");
      setEmail("");
      setClave("");
      setIdRol("");
    }
  }, [usuarioSeleccionado]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...usuarioSeleccionado,
      nombre,
      email,
      id_rol: idRol,
    };

    if (clave.trim() !== "") {
      data.clave = clave;
    }

    onSave(data);
  };

  return (
    <div className="modal-fondo">
      <div className="modal-contenedor">
        <h2>{usuarioSeleccionado ? "Editar Usuario" : "Crear Usuario"}</h2>

        <form className="modal-formulario" onSubmit={handleSubmit}>
          <input
            className="modal-entrada"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
            required
          />

          <input
            className="modal-entrada"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          <input
            className="modal-entrada"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            placeholder={usuarioSeleccionado ? "Nueva clave (opcional)" : "Clave (requerida)"}
            type="password"
            required={!usuarioSeleccionado}
          />

          <select className="modal-select" value={idRol} onChange={(e) => setIdRol(e.target.value)} required>
            <option value="">Seleccionar Rol</option>
            {roles.map((r) => (
              <option key={r.id} value={r.id}>
                {r.nombre}
              </option>
            ))}
          </select>

          <div className="modal-acciones">
            <button type="button" className="modal-boton-cancelar" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="modal-boton-guardar">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

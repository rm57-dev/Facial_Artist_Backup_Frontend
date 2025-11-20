import React, { useState } from "react";
import "./ServicesModal.css";

export function ServiceModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.duration) {
      alert("Por favor completa los campos requeridos (nombre, precio y duración)");
      return;
    }

    onSave(formData);
    resetForm();
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      duration: "",
      image: null,
    });
    setImagePreview(null);
  };

  if (!isOpen) return null;

  return (
    <div className="service-modal-overlay" onClick={handleCancel}>
      <div
        className="service-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="service-modal-header">
          <h2>Agregar Nuevo Servicio</h2>
          <button className="service-modal-close" onClick={handleCancel}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="service-modal-form">
          <div className="service-form-group">
            <label>
              Nombre del Servicio <span className="required">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Maquillaje Profesional"
              required
            />
          </div>

          <div className="service-form-group">
            <label>Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe el servicio..."
              rows="4"
            />
          </div>

          <div className="service-form-row">
            <div className="service-form-group">
              <label>
                Precio (COP) <span className="required">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="150000"
                min="0"
                step="1000"
                required
              />
            </div>

            <div className="service-form-group">
              <label>
                Duración (minutos) <span className="required">*</span>
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="60"
                min="15"
                step="15"
                required
              />
            </div>
          </div>

          <div className="service-form-group">
            <label>Imagen del Servicio</label>

            <div className="service-image-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="service-file-input"
              />

              {imagePreview && (
                <div className="service-image-preview">
                  <img src={imagePreview} alt="Preview" />

                  <button
                    type="button"
                    className="service-remove-image"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData((prev) => ({ ...prev, image: null }));
                    }}
                  >
                    Eliminar imagen
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="service-modal-actions">
            <button
              type="button"
              className="service-btn service-btn-cancel"
              onClick={handleCancel}
            >
              Cancelar
            </button>

            <button type="submit" className="service-btn service-btn-save">
              Guardar Servicio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
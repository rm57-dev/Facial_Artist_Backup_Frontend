import React, { useState, useRef, useEffect } from "react";
import "./select.css";

export function Select({ value, onValueChange, children }) {
  const [open, setOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="select-wrapper" ref={selectRef}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          open,
          setOpen,
          value,
          onValueChange,
        })
      )}
    </div>
  );
}

export function SelectTrigger({ open, setOpen, children }) {
  return (
    <button
      type="button"
      className="select-trigger"
      onClick={() => setOpen(!open)}
    >
      <span>{children}</span>
      <span className="select-arrow">{open ? "▲" : "▼"}</span>
    </button>
  );
}

export function SelectContent({
  open,
  value,
  onValueChange,
  setOpen,
  children,
}) {
  if (!open) return null;
  return <div className="select-content">{children}</div>;
}

export function SelectItem({ value, children, onValueChange }) {
  return (
    <div
      className="select-item"
      onClick={() => onValueChange && onValueChange(value)}
    >
      {children}
    </div>
  );
}

export function SelectValue({ value, placeholder }) {
  return (
    <span className="select-value">
      {value ? value : <span className="select-placeholder">{placeholder}</span>}
    </span>
  );
}

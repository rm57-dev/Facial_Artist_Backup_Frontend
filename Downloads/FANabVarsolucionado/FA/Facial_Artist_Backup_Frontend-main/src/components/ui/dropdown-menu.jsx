import React, { useState, useRef, useEffect } from "react";
import "./dropdown-menu.css";

export function DropdownMenu({ children }) {
  return <div className="dropdown-menu">{children}</div>;
}

export function DropdownMenuTrigger({ asChild, children }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropdown-wrapper" ref={menuRef}>
      <div
        className="dropdown-trigger"
        onClick={() => setOpen(!open)}
      >
        {children[0]}
      </div>
      {open && <div className="dropdown-content">{children[1]}</div>}
    </div>
  );
}

export function DropdownMenuContent({ children, className = "" }) {
  return <div className={`dropdown-content ${className}`}>{children}</div>;
}

export function DropdownMenuItem({ children, onClick, className = "" }) {
  return (
    <button
      className={`dropdown-item ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

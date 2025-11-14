import React from "react";
import "./input.css";

export function Input({
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
  disabled,
  defaultValue,
  id,
  ...props
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      defaultValue={defaultValue}
      disabled={disabled}
      className={`custom-input ${className}`}
      {...props}
    />
  );
}

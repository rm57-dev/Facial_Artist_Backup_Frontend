import React, { useState } from "react";
import "./Tabs.css";

export function Tabs({ defaultValue, children, className = "" }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  // Asignamos onClick a los TabsTrigger hijos
  const enhancedChildren = React.Children.map(children, (child) => {
    if (child.type === TabsList) {
      return React.cloneElement(child, { activeTab, setActiveTab });
    }
    if (child.type === TabsContent) {
      return React.cloneElement(child, { activeTab });
    }
    return child;
  });

  return (
    <div data-slot="tabs" className={`tabs ${className}`}>
      {enhancedChildren}
    </div>
  );
}

export function TabsList({ children, activeTab, setActiveTab, className = "" }) {
  const enhancedChildren = React.Children.map(children, (child) => {
    if (child.type === TabsTrigger) {
      return React.cloneElement(child, { activeTab, setActiveTab });
    }
    return child;
  });

  return (
    <div data-slot="tabs-list" className={`tabs-list ${className}`}>
      {enhancedChildren}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  activeTab,
  setActiveTab,
  className = "",
}) {
  const isActive = activeTab === value;

  return (
    <button
      data-slot="tabs-trigger"
      className={`tabs-trigger ${isActive ? "active" : ""} ${className}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, activeTab, children, className = "" }) {
  if (activeTab !== value) return null;
  return (
    <div data-slot="tabs-content" className={`tabs-content ${className}`}>
      {children}
    </div>
  );
}

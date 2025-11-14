import React from "react";
// import { DayPicker } from "react-day-picker";
// import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Calendar.css";

export function Calendar({
  className = "",
  showOutsideDays = true,
  ...props
}) {
  return (
    <div className={`calendar-container ${className}`}>
      <DayPicker
        showOutsideDays={showOutsideDays}
        classNames={{
          months: "calendar-months",
          month: "calendar-month",
          caption: "calendar-caption",
          caption_label: "calendar-caption-label",
          nav: "calendar-nav",
          nav_button: "calendar-nav-button",
          nav_button_previous: "calendar-nav-prev",
          nav_button_next: "calendar-nav-next",
          table: "calendar-table",
          head_row: "calendar-head-row",
          head_cell: "calendar-head-cell",
          row: "calendar-row",
          cell: "calendar-cell",
          day: "calendar-day",
          day_selected: "calendar-day-selected",
          day_today: "calendar-day-today",
          day_outside: "calendar-day-outside",
          day_disabled: "calendar-day-disabled",
        }}
        components={{
          IconLeft: () => <ChevronLeft className="calendar-icon" />,
          IconRight: () => <ChevronRight className="calendar-icon" />,
        }}
        {...props}
      />
    </div>
  );
}

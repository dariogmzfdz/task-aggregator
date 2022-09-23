import React from "react";

export default function CheckboxTplSvg() {
  return (
    <svg
      viewBox="0 0 0 0"
      style={{ position: "absolute", zIndex: -1, opacity: 0 }}
    >
      <defs>
        <path id="todo__line" d="M21 12.3h168v0.1z" />
        <path
          id="todo__box"
          d="M21 12.7v5c0 1.3-1 2.3-2.3 2.3H8.3C7 20 6 19 6 17.7V7.3C6 6 7 5 8.3 5h10.4C20 5 21 6 21 7.3v5.4"
        />
        <path id="todo__check" d="M10 13l2 2 5-5" />
        <circle id="todo__circle" cx="13.5" cy="12.5" r="10" />
      </defs>
    </svg>
  );
}

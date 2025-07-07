// src/components/Toolbar.js
import React from "react";
import "../styles/Toolbar.css";

const Toolbar = ({ onAdd, onDeleteSelected, selectedCount }) => {
  return (
    <div className="toolbar">
      <button onClick={onAdd}>افزودن مخاطب</button>
      <button
        onClick={onDeleteSelected}
        disabled={selectedCount === 0}
        className="danger"
      >
        حذف {selectedCount > 0 ? `(${selectedCount})` : "گروهی"}
      </button>
    </div>
  );
};

export default Toolbar;

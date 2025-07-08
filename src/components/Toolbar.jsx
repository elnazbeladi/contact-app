import React from "react";

export default function Toolbar({ onAdd, onDeleteSelected, selectedCount }) {
  return (
    <div className="toolbar">
      <button onClick={onAdd}>➕ افزودن مخاطب</button>

      {selectedCount > 0 && (
        <button className="danger" onClick={onDeleteSelected}>
          🗑 حذف {selectedCount} مورد
        </button>
      )}
    </div>
  );
}

import React from "react";

export default function ContactItem({ contact, onEdit, onDelete, selected, onSelect }) {
  return (
    <div className="contact-item">
      <input
        type="checkbox"
        checked={selected}
        onChange={() => onSelect(contact.id)}
      />
      <span>
        {contact.firstName} {contact.lastName} - {contact.email}
      </span>
      <button onClick={() => onEdit(contact)}>✏️</button>
      <button className="danger" onClick={() => onDelete(contact)}>🗑</button>
    </div>
  );
}


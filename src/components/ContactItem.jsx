// src/components/ContactItem.js
import React from "react";
import "../styles/ContactItem.css";

const ContactItem = ({ contact, onEdit, onDelete, isSelected, onToggleSelect }) => {
  return (
    <div className={`contact-item ${isSelected ? "selected" : ""}`}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onToggleSelect}
      />
      <div className="info">
        <p><strong>نام:</strong> {contact.firstName}</p>
        <p><strong>نام خانوادگی:</strong> {contact.lastName}</p>
        <p><strong>ایمیل:</strong> {contact.email}</p>
      </div>
      <div className="actions">
        <button className="edit" onClick={() => onEdit(contact)}>ویرایش</button>
        <button className="delete" onClick={() => onDelete(contact)}>حذف</button>
      </div>
    </div>
  );
};

export default ContactItem;

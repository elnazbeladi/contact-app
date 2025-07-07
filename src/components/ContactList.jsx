// src/components/ContactList.js
import React from "react";
import ContactItem from "./ContactItem";
import "../styles/ContactList.css";

const ContactList = ({
  contacts,
  onEdit,
  onDelete,
  selectedContacts,
  setSelectedContacts,
}) => {
  const toggleSelect = (id) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="contact-list">
      {contacts.length === 0 ? (
        <p className="empty">هیچ مخاطبی یافت نشد</p>
      ) : (
        contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            onEdit={onEdit}
            onDelete={onDelete}
            isSelected={selectedContacts.includes(contact.id)}
            onToggleSelect={() => toggleSelect(contact.id)}
          />
        ))
      )}
    </div>
  );
};

export default ContactList;

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
    <div>
      <div className="contact-list">
        {contacts.length === 0 ? (
          <p className="empty">هیچ مخاطبی یافت نشد</p>
        ) : (
          contacts.map((contact) => (<div key={contact.id}>
            <div key={contact.id} className="contact-item">
              <input
                type="checkbox"
                checked={selectedContacts.includes(contact.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedContacts([...selectedContacts, contact.id]);
                  } else {
                    setSelectedContacts(
                      selectedContacts.filter((id) => id !== contact.id)
                    );
                  }
                }}
                />
              <span>
                {contact.firstName} {contact.lastName}
              </span>
              <span>{contact.email}</span>
              <button onClick={() => onEdit(contact)}>✏️</button>
              <button onClick={() => onDelete(contact)}>🗑️</button>
            </div>
      {/* <input
        type="checkbox"
        checked={selectedContacts.includes(contact.id)}
        onChange={(e) => {
          if (e.target.checked) {
            setSelectedContacts([...selectedContacts, contact.id]);
          } else {
            setSelectedContacts(
              selectedContacts.filter((id) => id !== contact.id)
            );
          }
        }}
        /> */}
        </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactList;

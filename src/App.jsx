// src/App.js
import React, { useState } from "react";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import SearchBar from "./components/SearchBar";
import Toolbar from "./components/Toolbar";
import Modal from "./components/Modal";
import "./styles/App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [modal, setModal] = useState({ visible: false, action: null });

  const filteredContacts = contacts.filter((c) => {
    const fullName = `${c.firstName} ${c.lastName}`.toLowerCase();
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const addContact = (contact) => {
    setContacts([...contacts, { ...contact, id: Date.now() }]);
  };

  const updateContact = (updated) => {
    setContacts(
      contacts.map((c) => (c.id === updated.id ? { ...updated } : c))
    );
    setEditingContact(null);
  };

  const confirmDelete = (contact) => {
    setModal({
      visible: true,
      action: () => {
        setContacts(contacts.filter((c) => c.id !== contact.id));
        setModal({ visible: false, action: null });
      },
    });
  };

  const confirmDeleteSelected = () => {
    setModal({
      visible: true,
      action: () => {
        setContacts(contacts.filter((c) => !selectedContacts.includes(c.id)));
        setSelectedContacts([]);
        setModal({ visible: false, action: null });
      },
    });
  };

  return (
    <div className="app">
      <h1>دفترچه مخاطبین</h1>

      <SearchBar query={searchQuery} setQuery={setSearchQuery} />

      <Toolbar
        onAdd={() => setEditingContact({})}
        onDeleteSelected={confirmDeleteSelected}
        selectedCount={selectedContacts.length}
      />

      <ContactList
        contacts={filteredContacts}
        onEdit={(c) => setEditingContact(c)}
        onDelete={confirmDelete}
        selectedContacts={selectedContacts}
        setSelectedContacts={setSelectedContacts}
      />

      {editingContact && (
        <ContactForm
          contact={editingContact}
          onCancel={() => setEditingContact(null)}
          onSubmit={(c) =>
            editingContact.id ? updateContact(c) : addContact(c)
          }
        />
      )}

      {modal.visible && (
        <Modal
          message="آیا از انجام این عملیات مطمئن هستید؟"
          onConfirm={() => modal.action()}
          onCancel={() => setModal({ visible: false, action: null })}
        />
      )}
    </div>
  );
}

export default App;

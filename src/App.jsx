import React, { useState, useEffect } from "react";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import SearchBar from "./components/SearchBar";
import Toolbar from "./components/Toolbar";
import Modal from "./components/Modal";
import { parseRoute, navigateTo } from "./components/Routers";
import "./styles/App.css";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modal, setModal] = useState({ visible: false, action: null });
  const [route, setRoute] = useState(parseRoute(window.location.hash));
  const [selectedContacts, setSelectedContacts] = useState([]);

  useEffect(() => {
    const onHash = () => setRoute(parseRoute(window.location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    console.log("📍 route is now:", route.page);
  }, [route]);

  const addContact = (c) =>
    setContacts([...contacts, { ...c, id: Date.now() }]);
  const updateContact = (u) =>
    setContacts(contacts.map((c) => (c.id === u.id ? u : c)));
  const confirmDeleteOne = (contact) =>
    setModal({
      visible: true,
      action: () => {
        setContacts(contacts.filter((c) => c.id !== contact.id));
        setModal({ visible: false, action: null });
      },
    });

  const confirmDeleteSelected = () =>
    setModal({
      visible: true,
      action: () => {
        setContacts(contacts.filter((c) => !selectedContacts.includes(c.id)));
        setSelectedContacts([]); // پاک‌سازی انتخاب‌ها
        setModal({ visible: false, action: null });
      },
    });

  const filtered = contacts.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    );
  });

  if (route.page === "add") {
    return (
      <div className="app">
        <ContactForm
          contact={{}} // فرم خالی برای افزودن
          onCancel={() => navigateTo("/")}
          onSubmit={(c) => {
            addContact(c);
            navigateTo("/");
          }}
        />
      </div>
    );
  }

  if (route.page === "edit") {
    const contact = contacts.find((c) => c.id === route.id);
    return (
      <div className="app">
        {contact ? (
          <ContactForm
            contact={contact}
            onCancel={() => navigateTo("/")}
            onSubmit={(c) => {
              updateContact(c);
              navigateTo("/");
            }}
          />
        ) : (
          <p style={{ textAlign: "center" }}>مخاطب پیدا نشد</p>
        )}
      </div>
    );
  }

  return (
    <div className="app">
      <h1>دفترچه مخاطبین</h1>

      <SearchBar query={searchQuery} setQuery={setSearchQuery} />

      <Toolbar
        onAdd={() => navigateTo("/add")}
        onDeleteSelected={confirmDeleteSelected}
        selectedCount={selectedContacts.length}
      />

      <ContactList
        contacts={filtered}
        onEdit={(c) => navigateTo(`/edit/${c.id}`)}
        onDelete={confirmDeleteOne}
        selectedContacts={selectedContacts}
        setSelectedContacts={setSelectedContacts}
      />

      {modal.visible && (
        <Modal
          message="آیا مطمئن هستید؟"
          onConfirm={modal.action}
          onCancel={() => setModal({ visible: false, action: null })}
        />
      )}
    </div>
  );
}

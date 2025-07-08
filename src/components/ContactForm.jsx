import React, { useState, useEffect } from "react";
import "../styles/ContactForm.css";

const ContactForm = ({ contact, onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (contact) {
      setFormData({
        firstName: contact.firstName || "",
        lastName: contact.lastName || "",
        email: contact.email || "",
        id: contact.id,
      });
    }
  }, [contact]);

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = "نام الزامی است";
    if (!formData.lastName.trim()) errs.lastName = "نام خانوادگی الزامی است";
    if (!formData.email.trim()) {
      errs.email = "ایمیل الزامی است";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "ایمیل نامعتبر است";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      setFormData({ firstName: "", lastName: "", email: "" });
    }
  };

  return (
    <div className="contact-form">
      <h2>{contact.id ? "ویرایش مخاطب" : "افزودن مخاطب جدید"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          نام:
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </label>
        <label>
          نام خانوادگی:
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </label>
        <label>
          ایمیل:
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>
        <div className="form-actions">
          <button type="submit">ذخیره</button>
          <button type="button" onClick={onCancel}>انصراف</button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

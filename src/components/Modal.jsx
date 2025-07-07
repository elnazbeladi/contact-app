// src/components/Modal.js
import React from "react";
import "../styles/Modal.css";

const Modal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="confirm" onClick={onConfirm}>تأیید</button>
          <button className="cancel" onClick={onCancel}>لغو</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

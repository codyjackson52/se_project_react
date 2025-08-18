import React, { useState } from "react";
import "../ModalWithForm/ModalWithForm.css";

const RegisterModal = ({ isOpen, onClose, onRegister }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, avatar, email, password });
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button className="modal__close" onClick={onClose} />
        <form className="modal__form" onSubmit={handleSubmit}>
          <h3 className="modal__title">Sign up</h3>

          <label className="modal__label">
            Name
            <input
              type="text"
              className="modal__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label className="modal__label">
            Avatar URL
            <input
              type="url"
              className="modal__input"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              required
            />
          </label>

          <label className="modal__label">
            Email
            <input
              type="email"
              className="modal__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="modal__label">
            Password
            <input
              type="password"
              className="modal__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button type="submit" className="modal__submit">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;

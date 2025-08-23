import React, { useState } from "react";
import "./RegisterModal.css"; // ✅ fixed import

function RegisterModal({ isOpen, onClose, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, avatar, email, password });
  };

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} />

        <form className="modal__form" onSubmit={handleSubmit}>
          <h2 className="modal__title">Sign Up</h2>

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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;

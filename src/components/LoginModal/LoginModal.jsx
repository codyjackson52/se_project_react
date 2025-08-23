import React, { useState } from "react";
import "./LoginModal.css"; // ✅ fixed import

function LoginModal({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} />
        <h2 className="modal__title">Log In</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          <label className="modal__label">
            Email
            <input
              type="email"
              className="modal__input"
              placeholder="Email"
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="modal__submit">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;

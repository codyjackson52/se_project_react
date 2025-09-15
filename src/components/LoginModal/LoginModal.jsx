import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose, onLogin, switchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  if (!isOpen) return null;
  console.log("✅ LoginModal is rendering");

  return (
    <ModalWithForm
      name="login"
      title="Log in"
      buttonText="Log in"
      handleCloseClick={onClose} // ✅ fixed
      isOpen={isOpen} // ✅ pass isOpen down
      onSubmit={handleSubmit}
      altButton="or Register"
      onAltClick={switchToRegister}
    >
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
    </ModalWithForm>
  );
}

export default LoginModal;

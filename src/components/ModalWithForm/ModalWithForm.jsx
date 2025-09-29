import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  switchText, // ✅ new optional prop
  onSwitch, // ✅ new optional prop
}) {
  return (
    <div className={`modal-with-form ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button type="button" className="modal__close" onClick={onClose} />
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}

          {/* ✅ Submit + Switch row */}
          <div className="modal__actions">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
            {switchText && (
              <button
                type="button"
                className="modal__switch-btn"
                onClick={onSwitch}
              >
                {switchText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

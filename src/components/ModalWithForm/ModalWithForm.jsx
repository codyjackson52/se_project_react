import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  handleCloseClick,
  isOpen,
  onSubmit,
}) {
  if (!isOpen) return null; // ✅ only render when open

  return (
    <div
      className="modal-with-form modal_opened" // ✅ class naming
      onClick={handleCloseClick} // ✅ close on overlay click
    >
      <div
        className="modal__content"
        onClick={(e) => e.stopPropagation()} // ✅ prevent closing when clicking inside
      >
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          className="modal__close"
          onClick={handleCloseClick}
        ></button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

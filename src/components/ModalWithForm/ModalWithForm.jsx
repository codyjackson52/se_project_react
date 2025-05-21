import { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  handleCloseClick,
}) {
  useEffect(() => {
    const handleEscClose = (e) => {
      console.log("Key pressed:", e.key); // 🟡 Log which key was pressed
      if (e.key === "Escape") {
        console.log("Escape key detected. Closing modal."); // 🟢 Confirm Escape triggered
        handleCloseClick();
      }
    };

    if (activeModal === "add-garment") {
      console.log("Modal is active. Adding Escape key listener."); // 🟠 Hooking up listener
      document.addEventListener("keydown", handleEscClose);
    }

    return () => {
      console.log("Cleaning up Escape listener."); // 🔵 Cleanup on unmount or inactive
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal, handleCloseClick]);

  console.log("Modal rendering with activeModal:", activeModal); // 🔴 Every render

  return (
    <div
      className={`modal ${
        activeModal === "add-garment" ? "modal__opened" : ""
      }`}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          className="modal__close"
          onClick={() => {
            console.log("Close button clicked."); // ✅ Confirm close button triggers
            handleCloseClick();
          }}
        ></button>
        <form className="modal__form">
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

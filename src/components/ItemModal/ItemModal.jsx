import { useEffect } from "react";
import "./ItemModal.css";

function ItemModal({ selectedCard, onClose }) {
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [onClose]);

  if (!selectedCard) return null;

  return (
    <div className="modal modal_opened" onClick={onClose}>
      <div className="modal__preview" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}></button>
        <img
          src={selectedCard.link}
          alt={selectedCard.name}
          className="modal__image-preview"
        />
        <p className="modal__caption">{selectedCard.name}</p>
      </div>
    </div>
  );
}

export default ItemModal;

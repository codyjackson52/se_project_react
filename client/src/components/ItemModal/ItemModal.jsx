import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemModal.css";

function ItemModal({ selectedCard, isOpen, onClose, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);

  // ⛔ If modal isn’t open or no card selected, return null
  if (!isOpen || !selectedCard) return null;

  // ✅ Ownership check — only show delete button if current user owns item
  const isOwn = selectedCard.owner === currentUser?._id;

  // ✅ Conditional class to hide button if not owner
  const itemDeleteButtonClassName = `modal__delete-button ${
    isOwn ? "" : "modal__delete-button_hidden"
  }`;

  return (
    <div className="modal-item" onClick={onClose}>
      <div className="modal__preview" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}></button>

        <img
          src={selectedCard.link}
          alt={selectedCard.name}
          className="modal__image-preview"
        />

        <div className="modal__info-bar">
          <div className="modal__text-group">
            <p className="modal__caption">{selectedCard.name}</p>
            <p className="modal__weather">Weather: {selectedCard.weather}</p>
          </div>

          <button
            className={itemDeleteButtonClassName}
            onClick={() => onDeleteClick(selectedCard)}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;

import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemModal.css";

function ItemModal({ selectedCard, onClose, onDeleteClick, isOpen }) {
  const currentUser = useContext(CurrentUserContext);

  if (!isOpen || !selectedCard) return null;

  const isOwner = selectedCard.owner === currentUser?._id;

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("modal")) onClose();
  };

  return (
    <div className="modal modal_opened" onMouseDown={handleBackdropClick}>
      <div className="modal-item" onMouseDown={(e) => e.stopPropagation()}>
        <button
          className="modal__close"
          type="button"
          aria-label="Close"
          onClick={onClose}
        />

        {/* Image fills the top */}
        <img
          className="modal__image"
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
        />

        {/* Caption bar (bottom) */}
        <div className="modal__caption">
          <div className="modal__text">
            <h3 className="modal__title">{selectedCard.name}</h3>
            <span className="modal__weather">
              Weather: {selectedCard.weather}
            </span>
          </div>
          {isOwner && (
            <button
              className="modal__delete"
              type="button"
              onClick={onDeleteClick}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;

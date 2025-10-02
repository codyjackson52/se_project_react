import "./ItemModal.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({ selectedCard, isOpen, onClose, onDeleteClick }) {
  // Get the current user from context to check ownership
  const currentUser = useContext(CurrentUserContext);

  // Don't render if modal is closed or no card is selected
  if (!isOpen || !selectedCard) return null;

  // Only owners can see the delete button
  const isOwner = selectedCard.owner === currentUser?._id;

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

          {isOwner && (
            <button
              className="modal__delete-button"
              onClick={() => onDeleteClick(selectedCard)}
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

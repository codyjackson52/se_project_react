import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemModal.css";

function ItemModal({ selectedCard, onClose, onDeleteClick, isOpen }) {
  const currentUser = useContext(CurrentUserContext);

  if (!isOpen || !selectedCard) return null;

  // ✅ Only show delete if the current user owns the card
  const isOwner = selectedCard.owner === currentUser?._id;

  return (
    <div className="modal modal_type_preview" onClick={onClose}>
      <div
        className="modal__content modal__content_type_preview"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__close" onClick={onClose} />

        <img
          className="modal__image"
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
        />
        <div className="modal__caption">
          <p className="modal__item-name">{selectedCard.name}</p>

          {isOwner && (
            <button
              className="modal__delete"
              type="button"
              onClick={onDeleteClick}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;

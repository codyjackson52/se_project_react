import React from "react";
import "./DeleteConfirmation.css";

function DeleteConfirmation({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="delete-modal" onClick={onCancel}>
      <div
        className="delete-modal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="delete-modal__close" onClick={onCancel}></button>
        <p className="delete-modal__text">
          Are you sure you want to delete this item?
        </p>
        <div className="delete-modal__buttons">
          <button className="delete-modal__button_confirm" onClick={onConfirm}>
            Yes, delete item
          </button>
          <button className="delete-modal__button_cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;

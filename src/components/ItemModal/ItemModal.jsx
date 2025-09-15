import "./ItemModal.css";

function ItemModal({ selectedCard, isOpen, onClose, onDeleteClick }) {
  if (!isOpen || !selectedCard) return null;

  return (
    <div className="modal-item" onClick={onClose}>
      <div className="modal__preview" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}></button>

        <img
          src={selectedCard.link}
          alt={selectedCard.name}
          className="modal__image-preview"
        />

        {/* ✅ Wrap caption, weather, and delete into one info bar */}
        <div className="modal__info-bar">
          <div className="modal__text-group">
            <p className="modal__caption">{selectedCard.name}</p>
            <p className="modal__weather">Weather: {selectedCard.weather}</p>
          </div>

          <button
            className="modal__delete-button"
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

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";

function AddItemModal({
  isOpen,
  onClose,
  onAddItem,
  garmentName,
  setGarmentName,
  garmentImage,
  setGarmentImage,
  garmentWeather,
  setGarmentWeather,
}) {
  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add Garment"
      isOpen={isOpen}
      handleCloseClick={onClose}
      onSubmit={onAddItem}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={garmentName}
          onChange={(e) => setGarmentName(e.target.value)}
          required
        />
      </label>

      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="text"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={garmentImage}
          onChange={(e) => setGarmentImage(e.target.value)}
          required
        />
      </label>

      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        {["hot", "warm", "cold"].map((type) => (
          <label
            key={type}
            htmlFor={type}
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              id={type}
              name="weather"
              value={type}
              className="modal__radio-input"
              checked={garmentWeather === type}
              onChange={(e) => setGarmentWeather(e.target.value)}
              required
            />
            <span>{type[0].toUpperCase() + type.slice(1)}</span>
          </label>
        ))}
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;

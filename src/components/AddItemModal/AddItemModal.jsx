import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";

function AddItemModal({ isOpen, onClose, onAddItem }) {
  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add Garment"
      isOpen={isOpen}
      handleCloseClick={onClose}
      onSubmit={onAddItem}
    >
      {/* form inputs here */}
    </ModalWithForm>
  );
}

export default AddItemModal;

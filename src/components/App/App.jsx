import { useEffect, useState } from "react";
import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeatherData } from "../../utils/weatherApi";
import { defaultClothingItems } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const [newGarmentName, setNewGarmentName] = useState("");
  const [newGarmentImage, setNewGarmentImage] = useState("");
  const [newGarmentWeather, setNewGarmentWeather] = useState("");

  useEffect(() => {
    getWeatherData()
      .then((data) => setWeatherData(data))
      .catch((err) => console.error("Weather fetch failed:", err));
  }, []);

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, []);

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setNewGarmentName("");
    setNewGarmentImage("");
    setNewGarmentWeather("");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleAddGarmentSubmit = (e) => {
    e.preventDefault();

    const newGarment = {
      _id: Date.now().toString(),
      name: newGarmentName,
      link: newGarmentImage,
      weather: newGarmentWeather,
    };

    setClothingItems([newGarment, ...clothingItems]);
    closeActiveModal();
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main
          weatherData={weatherData}
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
        />

        <ModalWithForm
          isOpen={activeModal === "add-garment"}
          title="New garment"
          buttonText="Add garment"
          handleCloseClick={closeActiveModal}
          onSubmit={handleAddGarmentSubmit}
        >
          <label htmlFor="name" className="modal__label">
            Name
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
              value={newGarmentName}
              onChange={(e) => setNewGarmentName(e.target.value)}
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
              value={newGarmentImage}
              onChange={(e) => setNewGarmentImage(e.target.value)}
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
                  checked={newGarmentWeather === type}
                  onChange={(e) => setNewGarmentWeather(e.target.value)}
                  required
                />
                <span>{type[0].toUpperCase() + type.slice(1)}</span>
              </label>
            ))}
          </fieldset>
        </ModalWithForm>

        <ItemModal
          isOpen={activeModal === "preview"}
          selectedCard={selectedCard}
          onClose={closeActiveModal}
        />

        <Footer />
      </div>
    </div>
  );
}

export default App;

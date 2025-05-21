import { useEffect, useState } from "react";
import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeatherData } from "../../utils/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    getWeatherData()
      .then((data) => setWeatherData(data))
      .catch((err) => console.error("Weather fetch failed:", err));
  }, []);

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />

        {activeModal === "add-garment" && (
          <ModalWithForm
            title="New garment"
            buttonText="Add garment"
            activeModal={activeModal}
            handleCloseClick={closeActiveModal}
          >
            <label htmlFor="name" className="modal__label">
              Name
              <input
                type="text"
                className="modal__input"
                id="name"
                placeholder="Name"
              />
            </label>

            <label htmlFor="imageUrl" className="modal__label">
              Image
              <input
                type="text"
                className="modal__input"
                id="imageUrl"
                placeholder="Image URL"
              />
            </label>

            <fieldset className="modal__radio-buttons">
              <legend className="modal__legend">
                Select the weather type:
              </legend>

              <label
                htmlFor="hot"
                className="modal__label modal__label_type_radio"
              >
                <input
                  type="radio"
                  id="hot"
                  name="weather"
                  className="modal__radio-input"
                />
                <span>Hot</span>
              </label>

              <label
                htmlFor="warm"
                className="modal__label modal__label_type_radio"
              >
                <input
                  type="radio"
                  id="warm"
                  name="weather"
                  className="modal__radio-input"
                />
                <span>Warm</span>
              </label>

              <label
                htmlFor="cold"
                className="modal__label modal__label_type_radio"
              >
                <input
                  type="radio"
                  id="cold"
                  name="weather"
                  className="modal__radio-input"
                />
                <span>Cold</span>
              </label>
            </fieldset>
          </ModalWithForm>
        )}

        {activeModal === "preview" && (
          <ItemModal selectedCard={selectedCard} onClose={closeActiveModal} />
        )}

        <Footer />
      </div>
    </div>
  );
}

export default App;

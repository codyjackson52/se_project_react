import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";

import { getWeatherData } from "../../utils/weatherApi";
import {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
} from "../../utils/api";

import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);

  const [newGarmentName, setNewGarmentName] = useState("");
  const [newGarmentImage, setNewGarmentImage] = useState("");
  const [newGarmentWeather, setNewGarmentWeather] = useState("");

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  useEffect(() => {
    getWeatherData()
      .then((data) => setWeatherData(data))
      .catch((err) => console.error("Weather fetch failed:", err));
  }, []);

  useEffect(() => {
    getClothingItems()
      .then((items) => {
        const normalized = items.map((item) => ({
          ...item,
          link: item.imageUrl,
        }));
        setClothingItems(normalized);
      })
      .catch((err) => console.error("Fetch failed", err));
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

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

    const newItem = {
      name: newGarmentName,
      imageUrl: newGarmentImage,
      weather: newGarmentWeather,
    };

    addClothingItem(newItem)
      .then((addedItem) => {
        const normalizedItem = { ...addedItem, link: addedItem.imageUrl };
        setClothingItems([normalizedItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => console.error("Add failed", err));
  };

  const handleDeleteClick = () => {
    setActiveModal("delete-confirmation");
  };

  const handleDeleteConfirm = () => {
    if (selectedCard) {
      deleteClothingItem(selectedCard._id)
        .then(() => {
          setClothingItems((items) =>
            items.filter((item) => item._id !== selectedCard._id)
          );
          setSelectedCard(null);
          closeActiveModal();
        })
        .catch((err) => console.error("Delete failed", err));
    }
  };

  return (
    <Router>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Header
                      handleAddClick={handleAddClick}
                      weatherData={weatherData}
                    />
                    <Main
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                    />
                  </>
                }
              />

              <Route
                path="/profile"
                element={
                  <>
                    <Header
                      handleAddClick={handleAddClick}
                      weatherData={weatherData}
                    />
                    <Profile
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      onAddClick={handleAddClick}
                    />
                  </>
                }
              />
            </Routes>

            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onClose={closeActiveModal}
              onAddItem={handleAddGarmentSubmit}
              garmentName={newGarmentName}
              setGarmentName={setNewGarmentName}
              garmentImage={newGarmentImage}
              setGarmentImage={setNewGarmentImage}
              garmentWeather={newGarmentWeather}
              setGarmentWeather={setNewGarmentWeather}
            />

            <ItemModal
              isOpen={activeModal === "preview"}
              selectedCard={selectedCard}
              onClose={closeActiveModal}
              onDeleteClick={handleDeleteClick}
            />

            <DeleteConfirmation
              isOpen={activeModal === "delete-confirmation"}
              onConfirm={handleDeleteConfirm}
              onCancel={closeActiveModal}
            />

            <Footer />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </Router>
  );
}

export default App;

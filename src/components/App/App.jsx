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
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"; // ✅ protect /profile

import { getWeatherData } from "../../utils/weatherApi";
import {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api";

import * as auth from "../../utils/auth";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);

  const [newGarmentName, setNewGarmentName] = useState("");
  const [newGarmentImage, setNewGarmentImage] = useState("");
  const [newGarmentWeather, setNewGarmentWeather] = useState("");

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  // Weather
  useEffect(() => {
    getWeatherData()
      .then((data) => setWeatherData(data))
      .catch((err) => console.error("Weather fetch failed:", err));
  }, []);

  // Items
  useEffect(() => {
    getClothingItems()
      .then((items) => {
        // Normalize to ensure each card has a stable `link` for <img src>
        const normalized = items.map((item) => ({
          ...item,
          link: item.imageUrl,
        }));
        setClothingItems(normalized);
      })
      .catch((err) => console.error("Fetch failed", err));
  }, []);

  // ESC to close modals
  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => e.key === "Escape" && closeActiveModal();
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal]);

  // Token check
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .getUserData(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((err) => console.error("Token check failed:", err));
    }
  }, []);

  // Auth
  const handleRegister = ({ name, avatar, email, password }) => {
    return auth
      .signup({ name, avatar, email, password })
      .then(() => handleLogin({ email, password }))
      .then(() => closeActiveModal())
      .catch((err) => console.error("Register failed:", err));
  };

  const handleLogin = ({ email, password }) => {
    return auth
      .signin({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return auth.getUserData(data.token).then((user) => {
            setCurrentUser(user);
            setIsLoggedIn(true);
            closeActiveModal();
          });
        }
      })
      .catch((err) => console.error("Login failed:", err));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    return auth
      .updateUserProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch((err) => console.error("Profile update failed:", err));
  };

  // Modal helpers
  const handleAddClick = () => setActiveModal("add-garment");
  const handleEditProfileClick = () => setActiveModal("edit-profile");
  const handleLoginClick = () => setActiveModal("login");
  const handleRegisterClick = () => setActiveModal("register");

  const closeActiveModal = () => {
    setActiveModal("");
    setNewGarmentName("");
    setNewGarmentImage("");
    setNewGarmentWeather("");
  };

  // Card interactions
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
    const token = localStorage.getItem("jwt");
    addClothingItem(newItem, token)
      .then((addedItem) => {
        const normalizedItem = { ...addedItem, link: addedItem.imageUrl };
        setClothingItems([normalizedItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => console.error("Add failed", err));
  };

  const handleDeleteClick = () => setActiveModal("delete-confirmation");

  const handleDeleteConfirm = () => {
    if (selectedCard) {
      const token = localStorage.getItem("jwt");
      deleteClothingItem(selectedCard._id, token)
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

  const handleCardLike = (card) => {
    const token = localStorage.getItem("jwt");
    const isLiked = card.likes.some((id) => id === currentUser?._id);

    const request = isLiked
      ? removeCardLike(card._id, token)
      : addCardLike(card._id, token);

    request
      .then((updatedCard) => {
        // ✅ Preserve `link` so the image doesn’t disappear after like toggle
        setClothingItems((items) =>
          items.map((item) =>
            item._id === updatedCard._id
              ? { ...updatedCard, link: updatedCard.imageUrl }
              : item
          )
        );
      })
      .catch((err) => console.error("Like toggle failed:", err));
  };

  return (
    <Router>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <CurrentUserContext.Provider value={currentUser}>
            <div className="page__content">
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Header
                        handleAddClick={handleAddClick}
                        weatherData={weatherData}
                        isLoggedIn={isLoggedIn}
                        onLogin={handleLoginClick}
                        onRegister={handleRegisterClick}
                      />
                      <Main
                        weatherData={weatherData}
                        handleCardClick={handleCardClick}
                        clothingItems={clothingItems}
                        isLoggedIn={isLoggedIn}
                        onCardLike={handleCardLike}
                      />
                    </>
                  }
                />

                {/* ✅ Protect profile + pass like + pass isLoggedIn */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <>
                        <Header
                          handleAddClick={handleAddClick}
                          weatherData={weatherData}
                          isLoggedIn={isLoggedIn}
                          onLogin={handleLoginClick}
                          onRegister={handleRegisterClick}
                        />
                        <Profile
                          clothingItems={clothingItems}
                          onCardClick={handleCardClick}
                          onAddClick={handleAddClick}
                          onEditProfile={handleEditProfileClick}
                          onSignOut={handleSignOut}
                          onCardLike={handleCardLike}
                          isLoggedIn={isLoggedIn}
                        />
                      </>
                    </ProtectedRoute>
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

              <RegisterModal
                isOpen={activeModal === "register"}
                onClose={closeActiveModal}
                onRegister={handleRegister}
                onSwitchToLogin={() => {
                  closeActiveModal();
                  setActiveModal("login");
                }}
              />

              <LoginModal
                isOpen={activeModal === "login"}
                onClose={closeActiveModal}
                onLogin={handleLogin}
                onSwitchToRegister={() => {
                  closeActiveModal();
                  setActiveModal("register");
                }}
              />

              <EditProfileModal
                isOpen={activeModal === "edit-profile"}
                onClose={closeActiveModal}
                onUpdateUser={handleUpdateUser}
                currentUser={currentUser}
              />

              <Footer />
            </div>
          </CurrentUserContext.Provider>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </Router>
  );
}

export default App;

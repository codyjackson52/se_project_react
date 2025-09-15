import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import { getWeatherData } from "../../utils/weatherApi";
import {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api";

import {
  register,
  login,
  checkToken,
  updateUserProfile,
} from "../../utils/auth";

import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const navigate = useNavigate();

  const [weatherData, setWeatherData] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [newGarmentName, setNewGarmentName] = useState("");
  const [newGarmentImage, setNewGarmentImage] = useState("");
  const [newGarmentWeather, setNewGarmentWeather] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // fetch weather on mount
  useEffect(() => {
    getWeatherData()
      .then((data) => setWeatherData(data))
      .catch((err) => console.error("Weather fetch failed:", err));
  }, []);

  // fetch clothing items on mount
  useEffect(() => {
    getClothingItems()
      .then((items) => setClothingItems(items))
      .catch((err) => console.error("Fetch failed", err));
  }, []);

  // close modal on Escape
  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") closeActiveModal();
    };
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal]);

  // check for existing token
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
      });
  }, []);

  // toggle F/C
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedCard(null); // ✅ clear selectedCard when closing
    setNewGarmentName("");
    setNewGarmentImage("");
    setNewGarmentWeather("");
  };

  const handleAddClick = () => setActiveModal("add-garment");

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    register({ name, avatar, email, password })
      .then(() => login({ email, password }))
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          return checkToken(res.token);
        }
        throw new Error("No token returned");
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch((err) => console.error("Register/Login failed:", err));
  };

  const handleLogin = ({ email, password }) => {
    login({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          return checkToken(res.token);
        }
        throw new Error("No token returned");
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch((err) => console.error("Login error:", err));
  };

  const handleProfileEditSubmit = ({ name, avatar }) => {
    updateUserProfile({ name, avatar })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch((err) => console.error("Profile update failed:", err));
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
        setClothingItems([addedItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => console.error("Add failed", err));
  };

  const handleDeleteClick = () => setActiveModal("delete-confirmation");

  const handleDeleteConfirm = () => {
    if (!selectedCard) return;
    deleteClothingItem(selectedCard._id)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== selectedCard._id)
        );
        closeActiveModal();
      })
      .catch((err) => console.error("Delete failed", err));
  };

  const handleCardLike = ({ _id, likes }) => {
    const isLiked = likes.some((id) => id === currentUser?._id);
    const likeRequest = !isLiked ? addCardLike(_id) : removeCardLike(_id);

    likeRequest
      .then((updatedCard) => {
        setClothingItems((items) =>
          items.map((item) => (item._id === _id ? updatedCard : item))
        );
      })
      .catch((err) => console.log("Like toggle failed:", err));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
                      onRegisterClick={() => setActiveModal("register")}
                      onLoginClick={() => setActiveModal("login")}
                    />
                    <Main
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onCardLike={handleCardLike}
                    />
                  </>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <>
                      <Header
                        handleAddClick={handleAddClick}
                        weatherData={weatherData}
                        onRegisterClick={() => setActiveModal("register")}
                        onLoginClick={() => setActiveModal("login")}
                      />
                      <Profile
                        clothingItems={clothingItems}
                        onCardClick={handleCardClick}
                        onAddClick={handleAddClick}
                        onEditProfile={() => setActiveModal("edit-profile")}
                        onSignOut={handleSignOut}
                        onCardLike={handleCardLike} // ✅ pass like handler
                      />
                    </>
                  </ProtectedRoute>
                }
              />
            </Routes>

            {/* Modals */}
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

            {selectedCard && (
              <ItemModal
                isOpen={activeModal === "preview"}
                selectedCard={selectedCard}
                onClose={closeActiveModal}
                onDeleteClick={handleDeleteClick}
              />
            )}

            <DeleteConfirmation
              isOpen={activeModal === "delete-confirmation"}
              onConfirm={handleDeleteConfirm}
              onCancel={closeActiveModal}
            />

            <RegisterModal
              isOpen={activeModal === "register"}
              onClose={closeActiveModal}
              onRegister={handleRegister}
              switchToLogin={() => setActiveModal("login")}
            />

            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              onLogin={handleLogin}
              switchToRegister={() => setActiveModal("register")}
            />

            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onClose={closeActiveModal}
              onUpdateUser={handleProfileEditSubmit}
            />

            <Footer />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

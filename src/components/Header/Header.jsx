import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  onRegisterClick,
  onLoginClick,
  onLogout,
}) {
  const currentUser = useContext(CurrentUserContext);

  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const city = weatherData?.city || "Loading...";

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img className="header__logo" src={logo} alt="Logo" />
        </Link>
        <p className="header__date header__date-and-location">
          {date}, {city}
        </p>
      </div>

      <div className="header__right">
        <ToggleSwitch />

        {currentUser ? (
          <>
            <button
              className="header__add-clothes-btn"
              onClick={handleAddClick}
            >
              + Add Clothes
            </button>

            <Link to="/profile" className="header__user-container">
              <span className="header__username">{currentUser.name}</span>
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar header__avatar_placeholder">
                  {currentUser.name[0].toUpperCase()}
                </div>
              )}
            </Link>

            <button className="header__button" onClick={onLogout}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <button className="header__button" onClick={onRegisterClick}>
              Sign Up
            </button>
            <button className="header__button" onClick={onLoginClick}>
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

import { Link } from "react-router-dom";
import { useContext } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  onLogin,
  onRegister,
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

        {isLoggedIn ? (
          <>
            <button
              className="header__add-clothes-btn"
              onClick={handleAddClick}
            >
              + Add Clothes
            </button>
            <Link to="/profile" className="header__user-container">
              <span className="header__username">
                {currentUser?.name || "User"}
              </span>
              <img
                src={currentUser?.avatar || avatar}
                alt={currentUser?.name || "User avatar"}
                className="header__avatar"
              />
            </Link>
          </>
        ) : (
          <div className="header__auth-buttons">
            <button className="header__auth-btn" onClick={onLogin}>
              Log In
            </button>
            <button className="header__auth-btn" onClick={onRegister}>
              Register
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const city = weatherData?.city || "Loading...";

  return (
    <header className="header">
      <div className="header__left">
        {/* ✅ Link to Main route */}
        <Link to="/">
          <img className="header__logo" src={logo} alt="Logo" />
        </Link>
        <p className="header__date header__date-and-location">
          {date}, {city}
        </p>
      </div>

      <div className="header__right">
        <ToggleSwitch />
        <button className="header__add-clothes-btn" onClick={handleAddClick}>
          + Add Clothes
        </button>

        {/* ✅ Link to Profile route */}
        <Link to="/profile" className="header__user-container">
          <span className="header__username">Terrence Tegenge</span>
          <img src={avatar} alt="Terrence Tegenge" className="header__avatar" />
        </Link>
      </div>
    </header>
  );
}

export default Header;

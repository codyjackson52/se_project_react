import React from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";

function Header({ handleAddClick, weatherData }) {
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const city = weatherData?.city || "Loading...";

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Logo" />
      <p className="header__date header__date-and-location">
        {date}, {city}
      </p>
      <button className="header__add-clothes-btn" onClick={handleAddClick}>
        + Add Clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegenge</p>
        <img src={avatar} alt="Terrence Tegenge" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;

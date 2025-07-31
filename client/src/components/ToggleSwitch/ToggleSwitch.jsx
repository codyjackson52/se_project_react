import "./ToggleSwitch.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

export default function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  const isCelsius = currentTemperatureUnit === "C";

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch__checkbox"
        checked={isCelsius}
        onChange={handleToggleSwitchChange}
      />
      <span className="toggle-switch__circle"></span>
      <span
        className={`toggle-switch__text toggle-switch__text_F ${
          !isCelsius ? "active" : ""
        }`}
      >
        &deg;F
      </span>
      <span
        className={`toggle-switch__text toggle-switch__text_C ${
          isCelsius ? "active" : ""
        }`}
      >
        &deg;C
      </span>
    </label>
  );
}

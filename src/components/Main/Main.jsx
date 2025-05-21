// src/components/Main/Main.jsx

import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function Main({ weatherData, handleCardClick }) {
  if (!weatherData) return <p>Loading weather...</p>;

  const filteredItems = defaultClothingItems.filter(
    (item) => item.weather === weatherData.type
  );

  return (
    <main>
      <WeatherCard
        temperature={weatherData.temperature}
        city={weatherData.city}
      />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temperature}°F in {weatherData.city} / You may
          want to wear:
        </p>
        <ul className="cards__list">
          {filteredItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;

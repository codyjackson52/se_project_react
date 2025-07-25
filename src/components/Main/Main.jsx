import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, handleCardClick, clothingItems, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  if (!weatherData) return <p>Loading weather...</p>;

  const filteredItems = clothingItems.filter(
    (item) => item.weather.toLowerCase() === weatherData.type.toLowerCase()
  );

  return (
    <main>
      {/* ✅ Weather Card shows temperature and city */}
      <WeatherCard
        temperature={weatherData.temperature}
        city={weatherData.city}
      />

      <section className="cards">
        <p className="cards__text">
          Today is {Math.round(weatherData.temperature[currentTemperatureUnit])}
          &deg;{currentTemperatureUnit} in {weatherData.city} / You may want to
          wear:
        </p>

        {filteredItems.length === 0 ? (
          <p className="cards__text">
            No recommended clothing for this weather.
          </p>
        ) : (
          <ul className="cards__list">
            {filteredItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
              />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default Main;

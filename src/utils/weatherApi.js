import { latitude, longitude, APIkey } from "./constants";

const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`;

export const getWeatherData = () => {
  return fetch(weatherApiUrl)
    .then((res) => {
      if (!res.ok) throw new Error(`Weather API error: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      const temperature = data.main.temp;
      const city = data.name;

      return {
        temperature,
        city,
        type: getWeatherType(temperature),
      };
    });
};

export const getWeatherType = (temp) => {
  if (temp >= 86) return "hot";
  else if (temp >= 66) return "warm";
  else return "cold";
};

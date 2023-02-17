import { useMemo } from "react";
import {
  TbTemperatureMinus,
  TbTemperaturePlus,
  TbTemperature,
  TbWind,
} from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import { MdOutlineVisibility } from "react-icons/md";
import "./styles.css";

const week = [
  "Domingo",
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
  "Sábado",
];

const date = new Date();

const formatedDate = date.toLocaleDateString("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const WeatherDetails = ({ data }) => {
  const day = useMemo(() => week[date.getDay()]);
  const visibility = useMemo(() => data.visibility / 1000);

  return (
    <div className="weather-container">
      <div className="city-container">
        <img
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
          alt="Ícone de temperatura"
        />
        <div className="description">
          <h2>
            {data.name}, {data.sys.country}
          </h2>
          <p>
            {day}, {formatedDate}
          </p>
        </div>
      </div>
      <div className="temperature-container">
        <div className="temperature-content">
          <h3>
            {parseInt(data.main.temp)}
            <span>°C</span>
          </h3>
          <p>{data.weather[0].description}</p>
        </div>
      </div>

      <div className="info-container">
        <div className="info-details">
          <div className="detail">
            <TbTemperature />
            <span>Sensação: {parseInt(data.main.feels_like)}°C</span>
          </div>
          <div className="detail">
            <TbTemperatureMinus />
            <span>Miníma: {parseInt(data.main.temp_min)}°C</span>
          </div>
          <div className="detail">
            <TbTemperaturePlus />
            <span>Máxima: {parseInt(data.main.temp_max)}°C</span>
          </div>
        </div>
        <div className="info-details">
          <div className="detail">
            <WiHumidity />
            <span>Umidade: {data.main.humidity}%</span>
          </div>
          <div className="detail">
            <TbWind />
            <span>Vento: {data.wind.speed}Km/h</span>
          </div>
          <div className="detail">
            <MdOutlineVisibility />
            <span>Visibilidade: {visibility}Km</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;

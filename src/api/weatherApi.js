import axios from "axios";

const apiKey = "efd653fa4dfcfed7ca8e6942d5423286";

const weatherApi = axios.create({
  baseURL: "https://api.openweathermap.org",
});

export const getWeatherData = async (city) => {
  const res = await weatherApi.get(
    `data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`
  );
  return res.data;
};

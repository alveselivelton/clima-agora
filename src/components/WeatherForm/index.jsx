import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWeatherData } from "../../api/weatherApi";
import { BsSearch } from "react-icons/bs";

import WeatherDetails from "../WeatherDetails";
import Loading from "../Loading";
import NotFound from "../NotFound";

import "./styles.css";

const WeatherForm = () => {
  const [city, setCity] = useState("");

  const inputRef = useRef();

  const { data, isInitialLoading, isError } = useQuery({
    queryKey: ["weather", city],
    queryFn: async () => getWeatherData(city),
    enabled: !!city,
    retry: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setCity(inputRef.current.value);

    inputRef.current.value = "";
  };

  return (
    <>
      <div className="form-container">
        <h1>Busque uma cidade</h1>
        <form className="form-content" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Digite o nome de uma cidade"
          />
          <button type="submit">
            <BsSearch />
          </button>
        </form>
      </div>
      {isError && <NotFound />}
      {isInitialLoading && <Loading />}
      {data && !isError && <WeatherDetails data={data} />}
    </>
  );
};

export default WeatherForm;

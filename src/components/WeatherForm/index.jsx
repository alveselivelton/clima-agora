import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWeatherData } from "../../api/weatherApi";
import { BsSearch } from "react-icons/bs";

import WeatherDetails from "../WeatherDetails";
import Loading from "../Loading";
import NotFound from "../NotFound";

import "./styles.css";

const WeatherForm = () => {
  const [city, setCity] = useState("");

  const { data, isInitialLoading, isError, refetch } = useQuery({
    queryKey: ["weather"],
    queryFn: async () => getWeatherData(city),
    enabled: false,
    retry: 1,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    refetch();
    setCity("");
  };

  return (
    <>
      <div className="form-container">
        <h1>Busque uma cidade</h1>
        <form className="form-content" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Digite o nome de uma cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
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

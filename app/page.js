"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ButtonDemo from "../components/ButtonDemo";
import ColorPicker from "../components/ColorPicker";
import PeoplePicker from "../components/PeoplePicker";

import { getPeople, getWeatherData } from "../lib/api";

const Homepage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const peopleArr = getPeople();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getWeatherData();
      setWeatherData(response);
    };
    fetchData();
  }, []);

  //console.log({ peopleArr });
  return (
    <div>
      <h1>Weather app</h1>
      {weatherData && (
        <div>
          <h2>{weatherData.city.name}</h2>
          <p>Current temp: {weatherData.list[0].main.temp}&deg; F</p>
          <p>{weatherData.list[0].weather[0].description}</p>
          <Image
            src={` https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`}
            alt={`Weather Icon for ${weatherData.list[0].weather[0].description}`}
            width={100}
            height={100}
          />
        </div>
      )}

      {/* <PeoplePicker people={peopleArr} />
      <ButtonDemo />
      <ColorPicker /> */}
    </div>
  );
};
export default Homepage;

"use client";

import { useState, useEffect } from "react";

import Image from "next/image";

import List from "../components/List";
import Tabs from "../components/Tabs";

import {
  getGeoLocation,
  getPeople,
  getWeatherData,
  getWeatherDataByLatLon,
} from "../lib/api";

const Homepage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // Renamed for consistency
  const [daysOfWeek, setDaysOfWeek] = useState(null);
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const peopleArr = getPeople();

  useEffect(() => {
    getGeoLocation()
      .then((position) => {
        console.log(position);
        setLocation(position);
      })
      .catch((error) => {
        setErrorMsg(error.toString());
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (location) {
        const response = await getWeatherDataByLatLon(location);
        setWeatherData(response);
      }
    };
    fetchData();
  }, [location]);

  useEffect(() => {
    const tempWeek = [];
    if (weatherData) {
      weatherData.list.forEach((block) => {
        const date = new Date(block.dt * 1000);
        const options = { weekday: "short" };
        const day = date.toLocaleDateString("en-US", options);
        if (!tempWeek.includes(day)) {
          tempWeek.push(day);
        }
      });
      setDaysOfWeek(tempWeek);
    }
  }, [weatherData]);

  return (
    <div>
      <h1>Weather app</h1>
      {errorMsg && <div>{errorMsg}</div>}
      {weatherData && (
        <div>
          <h2>{weatherData?.city.name}</h2>
          <p>Current temp: {weatherData.list[0].main.temp}&deg; F</p>
          <p>{weatherData.list[0].weather[0].description}</p>
          <Image
            src={`https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`}
            alt={`Weather icon for ${weatherData.list[0].weather[0].description}`}
            width={100}
            height={100}
          />
        </div>
      )}
      {weatherData && daysOfWeek && (
        <section>
          <Tabs
            activeIndex={activeDayIndex}
            items={daysOfWeek}
            clickHandler={setActiveDayIndex}
          />
          <List
            activeIndex={activeDayIndex}
            items={weatherData?.list}
            daysOfWeek={daysOfWeek}
          />
        </section>
      )}
    </div>
  );
};

export default Homepage;

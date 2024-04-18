"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Col from "../components/Col";
import Row from "../components/Row";
import List from "../components/List";
import Tabs from "../components/Tabs";
import Container from "../components/Container";
import { getGeoLocation, getWeatherDataByLatLon } from "../lib/api";

const Homepage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  useEffect(() => {
    const fetchLocationAndWeather = async () => {
      try {
        const position = await getGeoLocation();
        setLocation(position);
        const response = await getWeatherDataByLatLon(position);
        setWeatherData(response);
      } catch (error) {
        setErrorMsg(`Error fetching data: ${error.message}`);
      }
    };
    fetchLocationAndWeather();
  }, []);

  useEffect(() => {
    if (weatherData) {
      const tempWeek = [];
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
        <Container>
          <Row>
            <Col>
              <h2>{weatherData.city.name}</h2>
              <p>Current temp: {weatherData.list[0].main.temp}&deg; F</p>
              <p>{weatherData.list[0].weather[0].description}</p>
              <Image
                src={`https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`}
                alt={`Weather icon for ${weatherData.list[0].weather[0].description}`}
                width={100}
                height={100}
              />
            </Col>
            <Col>tabs and list</Col>
          </Row>
        </Container>
      )}

      {weatherData && daysOfWeek.length > 0 && (
        <section>
          <Tabs
            activeIndex={activeDayIndex}
            items={daysOfWeek}
            clickHandler={setActiveDayIndex}
          />
          <List
            activeIndex={activeDayIndex}
            items={weatherData.list}
            daysOfWeek={daysOfWeek}
          />
        </section>
      )}
    </div>
  );
};

export default Homepage;

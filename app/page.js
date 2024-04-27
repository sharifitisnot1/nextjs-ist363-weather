"use client";

// core components
import { useState, useEffect } from "react";

// next js components
import Image from "next/image";

// custom components
import Button from "../components/Button";
import Col from "../components/Col";
import Container from "../components/Container";
import Input from "../components/Input"; // Assuming you have an Input component
import List from "../components/List";
import Row from "../components/Row";
import Section from "../components/Section";
import Tabs from "../components/Tabs";
import Temp from "../components/Temp";

import {
  getGeoLocation,
  getWeatherDataByCityName,
  getWeatherDataByLatLon,
} from "../lib/api";

const Homepage = () => {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [locationInput, setLocationInput] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [daysOfWeek, setDaysOfWeek] = useState(null);
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [tempUnit, setTempUnit] = useState("imperial");

  useEffect(() => {
    getGeoLocation()
      .then((position) => {
        fetchWeatherByLatLon(
          position.coords.latitude,
          position.coords.longitude
        );
      })
      .catch((error) => {
        setErrorMsg(error.message || "Failed to get location");
      });
  }, []);

  const fetchWeatherByLatLon = async (lat, lon) => {
    try {
      const response = await getWeatherDataByLatLon({ lat, lon });
      setWeatherData(response);
      setLoading(false);
    } catch (error) {
      setErrorMsg("Failed to fetch weather data");
      setLoading(false);
    }
  };

  const fetchWeatherByCityName = async () => {
    try {
      setLoading(true);
      const response = await getWeatherDataByCityName(locationInput);
      setWeatherData(response);
      setLoading(false);
    } catch (error) {
      setErrorMsg("Failed to fetch weather data");
      setLoading(false);
    }
  };

  useEffect(() => {
    // filter out the days of the week
    const tempWeek = [];

    weatherData &&
      weatherData.list.filter((block) => {
        const date = new Date(block.dt * 1000);
        const options = { weekday: "short" };
        const day = date.toLocaleDateString("en-US", options);
        //console.log(day);
        if (!tempWeek.includes(day)) {
          tempWeek.push(day);
        }
      });

    setDaysOfWeek(tempWeek);

    // then set state with the days of the week
  }, [weatherData]);

  return (
    <Section>
      {errorMsg && <div>{errorMsg}</div>}
      {loading ? (
        <Container>
          <p>Loading...</p>
        </Container>
      ) : (
        <Container>
          <Row>
            <Col sm={3} md={4}>
              <h2>{weatherData.city.name}</h2>
              <Temp
                size="lg"
                amount={weatherData.list[0].main.temp}
                unit={tempUnit}
              />
              <p>{weatherData.list[0].weather[0].description}</p>
              <Image
                src={`https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`}
                alt={`Weather icon for ${weatherData.list[0].weather[0].description}`}
                width={100}
                height={100}
              />
              <br />
              <Button
                label={`Change to ${
                  tempUnit === "imperial" ? "celsius" : "fahrenheit"
                }`}
                clickHandler={() => {
                  setTempUnit(tempUnit === "imperial" ? "metric" : "imperial");
                }}
              />
            </Col>
            <Col sm={9} md={8}>
              {weatherData && daysOfWeek && (
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
                    unit={tempUnit}
                  />
                </section>
              )}
            </Col>
          </Row>
        </Container>
      )}
    </Section>
  );
};
export default Homepage;

"use client";

// core components
import { useState, useEffect } from "react";

// next js components
import Image from "next/image";

// custom components
import Button from "../components/Button";
import Col from "../components/Col";
import Container from "../components/Container";
import List from "../components/List";
import Row from "../components/Row";
import Section from "../components/Section";
import Tabs from "../components/Tabs";
import Temp from "../components/Temp";

import { getGeoLocation, getWeatherDataByLatLon } from "../lib/api";

const Homepage = () => {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [daysOfWeek, setDaysOfWeek] = useState(null);
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [tempUnit, setTempUnit] = useState("imperial");
  const [backgroundColor, setBackgroundColor] = useState("#fff"); // Default background color

  useEffect(() => {
    getGeoLocation()
      .then((position) => {
        console.log(position);
        setLocation(position);
      })
      .catch((error) => {
        setErrorMsg(error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getWeatherDataByLatLon(location);
      setWeatherData(response);
      setLoading(false);
    };
    if (location) {
      fetchData();
    }
  }, [location]);

  useEffect(() => {
    // Set background color based on weather condition
    const setBackgroundColorBasedOnWeather = () => {
      if (weatherData && weatherData.list.length > 0) {
        const weatherCondition =
          weatherData.list[0].weather[0].main.toLowerCase();
        switch (weatherCondition) {
          case "clear":
            setBackgroundColor("#87CEEB"); // Light blue for clear skies
            break;
          case "clouds":
            setBackgroundColor("#D3D3D3"); // Grey for cloudy skies
            break;
          case "rain":
            setBackgroundColor("#6495ED"); // Cornflower blue for rain
            break;
          case "thunderstorm":
            setBackgroundColor("#505050"); // Dark grey for storms
            break;
          case "snow":
            setBackgroundColor("#FFFFFF"); // White for snow
            break;
          default:
            setBackgroundColor("#F0E68C"); // Khaki for other conditions
            break;
        }
      }
    };

    setBackgroundColorBasedOnWeather();
  }, [weatherData]);

  useEffect(() => {
    // filter out the days of the week
    const tempWeek = [];

    weatherData &&
      weatherData.list.filter((block) => {
        const date = new Date(block.dt * 1000);
        const options = { weekday: "short" };
        const day = date.toLocaleDateString("en-US", options);
        if (!tempWeek.includes(day)) {
          tempWeek.push(day);
        }
      });

    setDaysOfWeek(tempWeek);
  }, [weatherData]);

  return (
    <Section style={{ backgroundColor: backgroundColor }}>
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

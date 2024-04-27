"use client";

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
  const [updateMsg, setUpdateMsg] = useState(""); // State to store update message

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
    location ? fetchData() : null;
  }, [location]);

  useEffect(() => {
    // Periodically update the weather data every 5 seconds
    const interval = setInterval(() => {
      if (location) {
        console.log("Fetching latest weather data...");
        getWeatherDataByLatLon(location).then((response) => {
          setWeatherData(response);
          setLoading(false);
          setUpdateMsg(
            `Weather data updated at ${new Date().toLocaleTimeString()}`
          ); // Update message with current time
        });
      }
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [location]);

  useEffect(() => {
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
              {updateMsg && <div>{updateMsg}</div>}{" "}
              {/* Display update message */}
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

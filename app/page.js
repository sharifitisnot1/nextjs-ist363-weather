"use client";

import { useState } from "react";

import Button from "../components/Button";

import Colorpicker from "../components/ColorPicker";

const Homepage = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <h1> Weather App</h1>
      <h2> Count: {count}</h2>
      <Button label="Increment" clickhandler={() => setCount(count + 1)}>
        increment
      </Button>
      <Button label="Decrement" clickhandler={() => setCount(count - 1)}>
        decrement
      </Button>
      <Button label="Download" />
      <Button label="Register Now" />
      <Button label="Learn more" />

      {count > 5 && <div>special message</div>}
      <br />
      <Button
        label={isVisible ? "Hide message" : "Show message"}
        clickhandler={() => {
          setIsVisible(!isVisible);
        }}
      />
      {isVisible && <p> Hello World!</p>}

      <Colorpicker />
    </div>
  );
};

export default Homepage;

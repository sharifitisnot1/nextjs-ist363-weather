import { useState } from "react";

import Button from "./Button";

import styles from "./ColorPicker.module.scss";

const colors = [
  { name: "red", value: "#ff0000" },
  {
    name: "green",
    value: "#00FF00",
  },
  { name: "blue", value: "#0000FF" },
  { name: "yellow", value: "#FFFF00" },
  { name: "orange", value: "#FF4500" },
  { name: "teal", value: "#00FFFF " },
];

const ColorPicker = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.colorPicker}>
      <div
        className={styles.colorpicker__block}
        style={{ backgroundColor: colors[activeIndex].value }}
      >
        <h2 className={styles.colorpicker__name}>{colors[activeIndex].name}</h2>
      </div>
      {colors.map((color, index) => {
        return (
          <Button
            key={index}
            backgroundColor={color.value}
            label={color.name}
            clickhandler={() => {
              setActiveIndex(index);
            }}
          />
        );
      })}
    </div>
  );
};
export default ColorPicker;

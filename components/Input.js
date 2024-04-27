import React from "react";

const Input = ({ placeholder, value, onChange }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        padding: "10px",
        fontSize: "16px",
        width: "100%", // Full-width in its container
        margin: "10px 0", // Margin for spacing
        boxSizing: "border-box", // Ensures padding does not affect width
      }}
    />
  );
};

export default Input;

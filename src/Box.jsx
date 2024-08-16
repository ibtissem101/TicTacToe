import React from "react";
import "./Box.css";

const Box = ({ onClick, state }) => {
  return (
    <button className="Box" onClick={onClick}>
      {state}
    </button>
  );
};

export default Box;

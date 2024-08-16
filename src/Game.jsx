import React from "react";
import Box from "./Box";
import "./Game.css";

const Game = ({ boxes, handleClick }) => {
  return (
    <div className="box">
      {boxes.map((b) => (
        <Box
          key={b.id}
          id={b.id}
          state={b.state}
          onClick={() => handleClick(b.id)}
        />
      ))}
    </div>
  );
};

export default Game;

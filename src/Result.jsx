import React from "react";

const Result = ({ winner }) => {
  if (winner === "X" || winner === "O") {
    return <div>{winner} is the winner </div>;
  } else if (winner === "D") {
    return <div>It's a draw</div>;
  }
};

export default Result;

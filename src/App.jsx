import React, { useState, useEffect } from "react";
import Game from "./Game";
import Reset from "./Reset";
import Result from "./Result";
import "./App.css";

function App() {
  const initialBoxes = [
    { id: 0, state: "" },
    { id: 1, state: "" },
    { id: 2, state: "" },
    { id: 3, state: "" },
    { id: 4, state: "" },
    { id: 5, state: "" },
    { id: 6, state: "" },
    { id: 7, state: "" },
    { id: 8, state: "" },
  ];

  const [winningPatterns] = useState([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]);

  const [Oboxes, setOboxes] = useState([]);
  const [Xboxes, setXboxes] = useState([]);
  const [boxes, setBoxes] = useState(initialBoxes);
  const [turn, setTurn] = useState("O");
  const [winner, setWinner] = useState(""); // State to hold winner

  useEffect(() => {
    checkGameStatus();
  }, [Oboxes, Xboxes]); // Corrected dependency array

  const checkGameStatus = () => {
    let isDraw = true; // Flag to check if it's a draw

    winningPatterns.forEach((w) => {
      const Xstatus = w.every((element) => Xboxes.includes(element));
      const Ostatus = w.every((element) => Oboxes.includes(element));

      if (Xstatus) {
        setWinner("X");
        isDraw = false;
      }
      if (Ostatus) {
        setWinner("O");
        isDraw = false;
      }
    });

    if (isDraw && boxes.every((b) => b.state !== "")) {
      setWinner("D"); // Set to draw if all boxes are filled and no winner
    }
  };

  const handleReset = () => {
    setBoxes(initialBoxes);
    setTurn("O");
    setWinner("");
    setOboxes([]);
    setXboxes([]);
  };

  const handleClick = (id) => {
    if (winner === "") {
      // Only allow clicks if there's no winner
      const updatedBoxes = boxes.map((b) => {
        if (b.id === id && b.state === "" && turn === "X") {
          setTurn("O");
          setXboxes([...Xboxes, b.id]);
          return { ...b, state: "X" };
        } else if (b.id === id && b.state === "" && turn === "O") {
          setTurn("X");
          setOboxes([...Oboxes, b.id]);
          return { ...b, state: "O" };
        } else {
          return b;
        }
      });

      setBoxes(updatedBoxes);
    }
  };

  return (
    <div className="App">
      <h2>TicTacToe Game</h2>
      <Game
        turn={turn}
        boxes={boxes}
        setBoxes={setBoxes}
        setTurn={setTurn}
        handleClick={handleClick}
      />
      <div>It's player {turn}'s turn</div>
      <Result winner={winner} />
      <Reset onClick={handleReset} />
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import fist1 from "./images/PinClipart.com_thyme-clipart_5590543.png";
import fist2 from "./images/PinClipart.com_rock-paper-scissors-clipart_5745173.png";
import paper from "./images/PinClipart.com_rock-paper-scissors-clipart_511523.png";
import scissors from "./images/PinClipart.com_rock-paper-scissors-clip_5360227.png";
import paper2 from "./images/paper-2.png";
import scissors2 from "./images/scissors-2.png";

import "./App.css";
import { Alert, ButtonGroup, Button } from "reactstrap";

function App() {
  const [player1WinCt, setPlayer1WinCt] = useState(0);
  const [player2WinCt, setPlayer2WinCt] = useState(0);
  const [maxRounds, setMaxRounds] = useState(0); // [3, 7, 15
  const [roundWinner, setRoundWinner] = useState("No one yet");
  const [round, setRound] = useState(0);
  const [rSelected, setRSelected] = useState(null);
  const [cSelected, setCSelected] = useState(1);
  const [rImage, setRImage] = useState(fist1);
  const [cImage, setCImage] = useState(fist2);
  const [isAnimationActive, setAnimationActive] = useState(false);
  const [showFirstImage, setShowFirstImage] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const setWinner = () => {
    if (rSelected === cSelected) {
      setRoundWinner("Tie");
    } else if (rSelected === 1 && cSelected === 2) {
      setRoundWinner("Computer");
      setPlayer2WinCt(player2WinCt + 1);
    } else if (rSelected === 1 && cSelected === 3) {
      setRoundWinner("You");
      setPlayer1WinCt(player1WinCt + 1);
    } else if (rSelected === 2 && cSelected === 1) {
      setRoundWinner("You");
      setPlayer1WinCt(player1WinCt + 1);
    } else if (rSelected === 2 && cSelected === 3) {
      setRoundWinner("Computer");
      setPlayer2WinCt(player2WinCt + 1);
    } else if (rSelected === 3 && cSelected === 1) {
      setRoundWinner("Computer");
      setPlayer2WinCt(player2WinCt + 1);
    } else if (rSelected === 3 && cSelected === 2) {
      setRoundWinner("You");
      setPlayer1WinCt(player1WinCt + 1);
    }
  };

  const getImage = (choice, player) => {
    if (choice === 1) {
      if (player === 1) return fist1;
      else return fist2;
    } else if (choice === 2) {
      if (player === 1) return paper;
      else return paper2;
    } else if (choice === 3) {
      if (player === 1) return scissors;
      else return scissors2;
    }
  };

  const startGame = (rounds) => {
    document.getElementById("btn-group-1").style.display = "none";
    document.getElementById("btn-group-2").style.display = "flex";
    document.getElementById("display-round-winner").style.display = "flex";
    document.getElementById("player1-info").style.display = "block";
    document.getElementById("player2-info").style.display = "block";
    setMaxRounds(rounds);
  };
  const endGame = () => {
    document.getElementById("btn-group-2").style.display = "none";
    document.getElementById("btn-group-1").style.display = "flex";
    document.getElementById("display-round-winner").style.display = "none";
    document.getElementById("player1-info").style.display = "none";
    document.getElementById("player2-info").style.display = "none";
    setRound(0);
    setRImage(fist1);
    setCImage(fist2);
    setRSelected(null);
    setCSelected(1);
    setAnimationActive(false);
    setShowFirstImage(true);
    setRoundWinner("No one yet");
    setMaxRounds(0);
    setGameOver(false);
    setPlayer1WinCt(0);
    setPlayer2WinCt(0);
  };

  const handleSubmit = () => {
    setAnimationActive(true);
    setShowFirstImage(true);
    const min = 1;
    const max = 3;
    setCSelected(Math.floor(Math.random() * (max - min + 1)) + min);
    setRImage(getImage(rSelected, 1));
    setCImage(getImage(cSelected, 2));
    setRound(round + 1);
    setWinner();
  };

  const handleAnimationEnd = () => {
    setAnimationActive(false);
    setShowFirstImage(false);
  };

  useEffect(() => {
    if (round === maxRounds && round !== 0) {
      setGameOver(true);
    }
  }, [round]);

  const getAlert = () => {
    if (player1WinCt > player2WinCt) {
      return <Alert color="primary">You won the game!</Alert>;
    } else if (player1WinCt < player2WinCt) {
      return <Alert color="primary">Computer won the game!</Alert>;
    } else {
      console.log("tie game");
      return <Alert color="primary">Tie game!</Alert>;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Rock, Paper, Scissors!</h1>
      </header>
      <main>
        <ButtonGroup id="btn-group-1">
          <Button id="best-3" onClick={() => startGame(3)} color="primary">
            Best of 3
          </Button>
          <Button id="best-7" onClick={() => startGame(7)} color="primary">
            Best of 7
          </Button>
          <Button id="best-15" onClick={() => startGame(15)} color="primary">
            Best of 15
          </Button>
        </ButtonGroup>

        <section id="display-round-winner">
          {round > 0 ? (
            <h1 id="round">
              Round {round} Winner... {!isAnimationActive ? roundWinner : null}
            </h1>
          ) : (
            <h1>Best of {maxRounds} wins the game. Good luck!</h1>
          )}

          {gameOver && !isAnimationActive ? <h1>{getAlert()}</h1> : null}

          <Button
            id="end-btn"
            onClick={endGame}
            color="primary"
            style={
              gameOver && !isAnimationActive
                ? { display: "flex" }
                : { display: "none" }
            }
          >
            Play Again
          </Button>
        </section>
        <section className="main-section">
          <section id="player-1">
            <section id="player1-info">
              <h2 id="player-1-name">Player 1: You</h2>
              <h3>Wins: {!isAnimationActive ? player1WinCt : "..."}</h3>
            </section>
            {showFirstImage ? (
              <img
                src={fist1}
                alt="default fist1"
                className={`App-logo animated-element ${
                  isAnimationActive ? "animate" : ""
                }`}
                onAnimationEnd={handleAnimationEnd}
              />
            ) : (
              <img
                src={rImage}
                className={`App-logo animated-element ${
                  isAnimationActive ? "animate" : ""
                }`}
                alt="logo"
                onAnimationEnd={handleAnimationEnd}
              />
            )}
          </section>
          <ButtonGroup id="btn-group-2">
            <Button
              color="primary"
              outline
              onClick={() => setRSelected(1)}
              active={rSelected === 1}
              disabled={rSelected === 1 || gameOver}
            >
              Rock
            </Button>
            <Button
              color="primary"
              outline
              onClick={() => setRSelected(2)}
              active={rSelected === 2}
              disabled={rSelected === 2 || gameOver}
            >
              Paper
            </Button>
            <Button
              color="primary"
              outline
              onClick={() => setRSelected(3)}
              active={rSelected === 3}
              disabled={rSelected === 3 || gameOver}
            >
              Scissors
            </Button>
            <Button
              color="primary"
              onClick={handleSubmit}
              disabled={rSelected === null || gameOver}
            >
              Shoot!
            </Button>
          </ButtonGroup>
          <section id="player-2">
            <section id="player2-info">
              <h2 id="player-2-name">Player 2: Computer</h2>
              <h3>Wins: {!isAnimationActive ? player2WinCt : "..."}</h3>
            </section>
            {showFirstImage ? (
              <img
                src={fist2}
                alt="default fist2"
                className={`App-logo animated-element ${
                  isAnimationActive ? "animate" : ""
                }`}
                onAnimationEnd={handleAnimationEnd}
              />
            ) : (
              <img
                src={cImage}
                className={`App-logo animated-element ${
                  isAnimationActive ? "animate" : ""
                }`}
                alt="logo"
                onAnimationEnd={handleAnimationEnd}
              />
            )}
          </section>
        </section>
      </main>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import classes from "./app.module.css";
import copy from "copy-to-clipboard";

import github from "./imgs/25231.png";

function App() {
  const [amount, setAmount] = useState("10");
  const [numbers, setNumbers] = useState(true);
  const [letters, setLetters] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState();
  const [clicked, setClicked] = useState(false);

  let disableNumbers = false;
  let disableLetters = false;
  let disableSymbols = false;

  const lettersArr = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  const symbolsArr = ["/", "*", "@", "#", "%", "$", ".", "&", "@"];
  const numbersArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  let filteredArray = [];
  let displayArray = [];

  useEffect(() => {
    if (numbers && symbols && letters) {
      filteredArray = lettersArr.concat(symbolsArr).concat(numbersArr);
      disableLetters = false;
      disableNumbers = false;
      disableSymbols = false;
    } else if (numbers === true && symbols === true) {
      filteredArray = symbolsArr.concat(numbersArr);
      disableNumbers = true;
      disableSymbols = true;
    } else if (symbols && letters) {
      filteredArray = lettersArr.concat(symbolsArr);
      disableLetters = true;
      disableSymbols = true;
    } else if (numbers && letters) {
      filteredArray = lettersArr.concat(numbersArr);
      disableNumbers = true;
      disableLetters = true;
    }

    displayArray = [];

    for (let i = 0; i < amount; i++) {
      const randomIndex = Math.floor(Math.random() * filteredArray.length);
      displayArray.push(filteredArray[randomIndex]);
    }

    const randomIndex = Math.floor(Math.random() * displayArray.length);
    displayArray[randomIndex] = displayArray[randomIndex].toUpperCase();

    setPassword(displayArray.join(""));
  }, [amount, clicked]);

  const copyToClipboard = () => {
    copy(password);
    alert("Your password has been copied !");
  };

  return (
    <div className={classes.app}>
      <div className={classes.wrapper}>
        <section className={classes.password}>
          <input
            disabled={true}
            className={classes["display-pass"]}
            value={password || ""}
          ></input>
          <div className={classes.btnwrapper}>
            <button className={classes.copy} onClick={copyToClipboard}>
              Copy
            </button>
            <button
              className={classes.regenerate}
              onClick={() => {
                setClicked(!clicked);
              }}
            >
              Generate
            </button>
          </div>
        </section>
        <section className={classes.settings}>
          <div className={classes["input-wrapper-range"]}>
            <label htmlFor="range">Length {`(${amount})`}</label>
            <input
              type="range"
              id="range"
              min="8"
              max="20"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            ></input>
          </div>
          <div className={classes["input-wrapper"]}>
            <input
              disabled={disableNumbers}
              type="checkbox"
              id="numbers"
              defaultChecked={numbers}
              onChange={(e) => {
                setNumbers(e.target.checked);
              }}
            ></input>
            <label htmlFor="numbers">Numbers</label>
          </div>
          <div className={classes["input-wrapper"]}>
            <input
              disabled={disableLetters}
              type="checkbox"
              id="letters"
              defaultChecked={letters}
              onChange={(e) => {
                setLetters(e.target.checked);
              }}
            ></input>
            <label htmlFor="letters">Letters</label>
          </div>
          <div className={classes["input-wrapper"]}>
            <input
              disabled={disableSymbols}
              type="checkbox"
              id="special-char"
              defaultChecked={symbols}
              onChange={(e) => {
                setSymbols(e.target.checked);
              }}
            ></input>
            <label htmlFor="special-char">Symbols</label>
          </div>
          <footer>
            <img src={github}></img>
            <a href="https://github.com/Eliswer/password-generator">
              Check the code on GitHub
            </a>
          </footer>
        </section>
      </div>
    </div>
  );
}

export default App;

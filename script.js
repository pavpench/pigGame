"use strict";

//selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score0Elem = document.querySelector("#score--0");
const score1Elem = document.getElementById("score--1");
const diceElem = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
let currentScore = 0;
const current0Elem = document.getElementById("current--0");
const current1Elem = document.getElementById("current--1");
let activePlayer = 0;
const scores = [0, 0];

score0Elem.textContent = 0;
score1Elem.textContent = 0;
diceElem.classList.add("hidden");

btnRoll.addEventListener("click", function () {
  //1.generate a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  //2. display dice
  diceElem.classList.remove("hidden");
  diceElem.src = `./assets/dice-${dice}.png`;
  //3. Check for rolled 1: if true, switch to next player
  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    //Add the dice to the current score
  } else {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
  }
});

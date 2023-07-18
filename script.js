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
const btnNewGame = document.querySelector(".btn--new");

let scores, currentScore, activePlayer, playing;
const current0Elem = document.getElementById("current--0");
const current1Elem = document.getElementById("current--1");

const init = function () {
  activePlayer = 0;
  currentScore = 0;
  playing = true;
  scores = [0, 0];

  score0Elem.textContent = 0;
  score1Elem.textContent = 0;
  current0Elem.textContent = 0;
  current1Elem.textContent = 0;

  diceElem.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");

  btnHold.classList.remove("hidden");
  btnRoll.classList.remove("hidden");
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

init();

btnRoll.addEventListener("click", function () {
  if (playing) {
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
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1. Add current score to active players score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if player score is >=100
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceElem.classList.add("hidden");
      btnHold.classList.add("hidden");
      btnRoll.classList.add("hidden");
      //finnish game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer;
    }
    //3. Switch to the next player
    switchPlayer();
  }
});

btnNew.addEventListener("click", init);

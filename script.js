"use strict";

//selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const player0NameEl = document.querySelector("#name--0");
const player1NameEl = document.querySelector("#name--1");
const score0Elem = document.querySelector("#score--0");
const score1Elem = document.getElementById("score--1");
const diceElem = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNewGame = document.querySelector(".btn--new");
const btnNextModal = document.querySelector(".btn--modal");
const rulesModal = document.querySelector(".modal");
const overlayModal = document.querySelector(".overlay");
const rules = document.querySelector(".rules");
const playerNamesModal = document.querySelector(".player--names");
const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");
const btnPlayerReady1 = document.querySelector(".ready--1");
const btnPlayerReady2 = document.querySelector(".ready--2");

let scores, currentScore, activePlayer, playing;
const current0Elem = document.getElementById("current--0");
const current1Elem = document.getElementById("current--1");

const openCloseModal = function () {
  rulesModal.classList.toggle("hidden");
  overlayModal.classList.toggle("hidden");
};
const modalSwitchContent = function () {
  rules.classList.toggle("hidden");
  playerNamesModal.classList.toggle("hidden");
};

btnNextModal.addEventListener("click", function () {
  modalSwitchContent();
  console.log(player1.value, player2.value);
  if (player1.value || player2.value) {
    btnNextModal.textContent = "Start!";
    player1.value
      ? (player0NameEl.textContent = player1.value)
      : (player0NameEl.textContent = "Player 1");
    player2.value
      ? (player1NameEl.textContent = player2.value)
      : (player1NameEl.textContent = "Player 2");
  }

  if (btnNextModal.textContent === "Start!") {
    openCloseModal();
  }
});

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


"use strict";

const MIN_NUMBER = 1;
const MAX_NUMBER = 20;

const form = document.getElementById("guess-form");
const input = document.getElementById("guess");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const secretDisplay = document.getElementById("secret-number");
const restartButton = document.getElementById("restart");
const guessButton = document.getElementById("guess-button");

let secretNumber;
let attempts;
let gameOver;

function startGame() {
  secretNumber =
    Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1))
    + MIN_NUMBER;

  attempts = 0;
  gameOver = false;

  attemptsDisplay.textContent = attempts;
  secretDisplay.textContent = "?";
  message.textContent = "¡Estoy pensando en un número!";
  input.value = "";
  input.disabled = false;
  guessButton.disabled = false;

  input.focus();
}

function checkGuess(event) {
  event.preventDefault();

  if (gameOver) return;

  const value = input.value.trim();
  const guess = Number(value);

  if (
    value === "" ||
    !Number.isInteger(guess) ||
    guess < MIN_NUMBER ||
    guess > MAX_NUMBER
  ) {
    message.textContent =
      "Escribe un número entero entre 1 y 20.";
    input.focus();
    return;
  }

  attempts++;
  attemptsDisplay.textContent = attempts;

  if (guess === secretNumber) {
    message.textContent =
      `¡Ganaste! 🎉 Lo encontraste en ${attempts} intento(s).`;

    secretDisplay.textContent = secretNumber;
    gameOver = true;
    input.disabled = true;
    guessButton.disabled = true;
  } else if (guess < secretNumber) {
    message.textContent = "El número secreto es más alto ⬆️";
  } else {
    message.textContent = "El número secreto es más bajo ⬇️";
  }

  if (!gameOver) {
    input.value = "";
    input.focus();
  }
}

form.addEventListener("submit", checkGuess);
restartButton.addEventListener("click", startGame);

startGame();

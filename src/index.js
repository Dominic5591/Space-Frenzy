import Ball from "./scripts/ball";
import Game from "./scripts/game";

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("game-container");
  const ctx = canvas.getContext("2d");

  const gameInstance = new Game();

  // canvas.addEventListener(
  //   "mousedown",
  //   gameInstance.handleMouseDown.bind(gameInstance)
  // );

  gameInstance.resetGame();
  gameInstance.updateGame();
});

import Game from "./scripts/game";

document.addEventListener("DOMContentLoaded", function () {
  const gameInstance = new Game();
  gameInstance.updateGame();
});

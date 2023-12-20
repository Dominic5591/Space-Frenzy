import Game from "./scripts/game";

document.addEventListener("DOMContentLoaded", function () {
  const mainMenu = document.getElementById("main-menu");
  mainMenu.style.display = "flex";
  const game = new Game();
  game.gameLoop();
})

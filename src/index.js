import Game from "./scripts/game";

document.addEventListener("DOMContentLoaded", function () {
  const mainMenu = document.getElementById("main-menu");
  mainMenu.style.display = "flex";
  const muteBtn = document.getElementById("mute")
  // const gameOver = document.getElementById("game-over")
  // gameOver.style.display = "hidden"


  muteBtn.addEventListener("click", function() {
    mainMusic.pause()
  })
  
  const game = new Game();
  game.gameLoop();
})

import Player from "./player"
import Bullet from "./bullet"
import RedEnemy from "./redEnemy"
import YellowEnemy from "./yellowEnemy"
class Game {
  constructor() {
    this.canvas = document.getElementById("game-container");
    this.ctx = this.canvas.getContext("2d");
    this.lives = 3;
    this.score = 0;
    this.moveUp = false;
    this.moveDown = false;
    this.yellowEnemies = [];
    this.redEnemies = [];
    this.bullets = [];
    this.player = new Player(this.canvas, this.ctx);
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyUp.bind(this));
    this.createRedEnemy(5);
    this.createYellowEnemy(3);
    this.updateGame();
  }


  createRedEnemy(num) {
    for (let i = 0; i < num; i++) {
      this.redEnemies.push(new RedEnemy(this.canvas, this.ctx));
    }
  }

  createYellowEnemy(num) {
    for (let i = 0; i < num; i++) {
      this.yellowEnemies.push(new YellowEnemy(this.canvas, this.ctx));
    }
  }

  reset() {
    this.redEnemies.length = 0;
    this.yellowEnemies.length = 0;
    this.score = 0;
    this.lives = 3;
    this.createRedEnemy(5);
    this.createYellowEnemy(3);
  }

  shoot() {
    let bullet = new Bullet(this.player);
    this.bullets.push(bullet);
  }

  updateBullets() {
    this.bullets.forEach((bullet, bulletIdx) => {
      bullet.draw(this.ctx);
      bullet.x += bullet.speed;

      this.bulletRedCollisions(bullet, bulletIdx);
    });
  }

  updateGame() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updateRed();
    this.updateYellow();
    this.updateBullets();
    this.updatePlayer();
    requestAnimationFrame(this.updateGame.bind(this));
  }


  updateRed() {
    this.redEnemies.forEach((red) => {
      red.move()
      red.draw()
      this.RedCollision(red)
      this.redWrap(red)
    });
  }

  updateYellow() { 
    this.yellowEnemies.forEach((yellow) => {
      yellow.move()
      yellow.draw()
      this.yellowCollision(yellow)
      this.bulletYellowCollisions(yellow)
      this.yellowWrap(yellow)
    });
  }

  updatePlayer() {
    this.player.draw()
    this.player.handleMovement(this.moveUp, this.moveDown, this.canvas);
  }

  RedCollision(red) {
    const distance = Math.hypot(red.x - this.player.x, red.y - this.player.y)
    if (distance < red.radius + this.player.radius) {
      this.lives--;
      // this.updateLives();
      if (this.lives > 0) {
        this.player.y = this.canvas.height / 2
      } else {
        alert("Game Over!")
        this.lives = 3
        this.reset()
      }
    }
  }

  yellowCollision(yellow) {
    const distance = Math.hypot(yellow.x - this.player.x, yellow.y - this.player.y)
    if (distance < yellow.width && !yellow.marked) {
      this.lives--
      if (this.lives > 0) { this.player.y = this.canvas.height / 2;
      } else {
        alert("Game Over!")
        this.lives = 3
        this.reset()
      }
    }
  }

  bulletYellowCollisions(yellow) {
    this.bullets.forEach((bullet, bulletIdx) => {
      if (
        bullet.x < yellow.x + yellow.width &&
        bullet.x + bullet.width > yellow.x &&
        bullet.y < yellow.y + yellow.height &&
        bullet.y + bullet.height > yellow.y
      ) {
        this.bullets.splice(bulletIdx, 1);
        yellow.takeDamage();

        if (yellow.marked) {
          this.yellowEnemies.splice(this.yellowEnemies.indexOf(yellow), 1);
          this.score += 300;
          this.createYellowEnemy(1);
        }
      }
    });
  }

  bulletRedCollisions(bullet, bulletIdx) {
    this.redEnemies.forEach((red, redIndex) => {
      if (bullet.x < red.x + red.radius && bullet.x + bullet.width > red.x - red.radius &&
        bullet.y < red.y + red.radius && bullet.y + bullet.height > red.y - red.radius
      ) {
        this.bullets.splice(bulletIdx, 1);
        this.redEnemies.splice(redIndex, 1);
        this.score += 100;
        this.createRedEnemy(1);
      }
    });
  }

  redWrap(red) {  // Wrapping RedEnemy around the canvas and randomizing y position if out of bounds
    if (red.x - red.radius < 0) red.x = this.canvas.width + red.radius;
    if (red.y - red.radius < 0 || red.y + red.radius > this.canvas.height) {
      red.y = Math.random() * (this.canvas.height - 2 * red.radius) + red.radius
    }
  }
  yellowWrap(yellow) { // Wrapping YellowEnemy around the canvas and randomizing y position if out of bounds
    if (yellow.x - yellow.radius < 0) yellow.x = this.canvas.width + yellow.radius;
    
    if (yellow.y - yellow.radius < 0 || yellow.y + yellow.radius > this.canvas.height) {
      yellow.y = Math.random() * (this.canvas.height - 2 * yellow.radius) + yellow.radius
    }
  }

  handleKeyUp(event) {
    switch (event.code) {
      case "ArrowUp": this.moveUp = false;
        break;
      case "ArrowDown": this.moveDown = false;
        break;
    }
  }
  handleKeyDown(event) {
    switch (event.code) {
      case "ArrowUp": this.moveUp = true;
        break;
      case "ArrowDown": this.moveDown = true;
        break;
      case "Space": this.shoot();
        break;
    }
  }
}
export default Game;
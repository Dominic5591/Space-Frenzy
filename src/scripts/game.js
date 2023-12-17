import Player from "./player";
import Bullet from "./bullet";
import BallEnemy from "./ballEnemy";
import SquareEnemy from "./squareEnemy";

// const circleEnemyImage = new Image();
// circleEnemyImage.src = "circle-enemy.png";

class Game {
  constructor() {
    this.canvas = document.getElementById("game-container");
    this.context = this.canvas.getContext("2d");
    this.ballEnemies = [];
    this.squareEnemies = [];
    this.score = 0;
    this.lives = 3;
    this.moveUp = false;
    this.moveDown = false;
    this.player = new Player(this.canvas, this.context);
    this.bullets = [];

    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyUp.bind(this));

    this.createBallEnemies(5);
    this.createSquareEnemies(3);
    this.updateGame();
  }

  createBallEnemies(numberOfBalls) {
    for (let i = 0; i < numberOfBalls; i++) {
      this.ballEnemies.push(new BallEnemy(this.canvas, this.context));
    }
  }

  createSquareEnemies(numberOfEnemies) {
    for (let i = 0; i < numberOfEnemies; i++) {
      this.squareEnemies.push(new SquareEnemy(this.canvas, this.context));
    }
  }

  updateScore() {
    const scoreElement = document.getElementById("score");
    if (scoreElement) {
      scoreElement.textContent = this.score;
    }
  }

  updateLives() {
    const livesContainer = document.getElementById("lives");
    if (livesContainer) {
      livesContainer.textContent = this.lives;
    }
  }

  resetGame() {
    this.ballEnemies.length = 0;
    this.squareEnemies.length = 0;
    this.score = 0;
    this.lives = 3;
    this.createBallEnemies(5);
    this.createSquareEnemies(3);
  }

  shootBullet() {
    const newBullet = new Bullet(this.player);
    this.bullets.push(newBullet);
  }

  updateGame() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.updateBallEnemies();
    this.updateSquareEnemies();
    this.updateBullets();
    this.updatePlayer();

    requestAnimationFrame(this.updateGame.bind(this));
  }

  updateBallEnemies() {
    this.ballEnemies.forEach((ball) => {
      ball.move();
      ball.draw();
      this.checkBallPlayerCollision(ball);
      this.handleBallWrapAround(ball);
    });
  }

  updateSquareEnemies() {
    this.squareEnemies.forEach((squareEnemy) => {
      squareEnemy.move();
      squareEnemy.draw();
      this.checkPlayerSquareEnemyCollision(squareEnemy);
      this.checkBulletSquareEnemyCollisions(squareEnemy);
      this.handleSquareEnemyWrapAround(squareEnemy);
    });
  }

  updateBullets() {
    this.bullets.forEach((bullet, bulletIndex) => {
      bullet.draw(this.context);
      bullet.x += bullet.speed;

      this.checkBulletBallCollisions(bullet, bulletIndex);
    });
  }

  updatePlayer() {
    this.player.draw();
    this.player.handleMovement(this.moveUp, this.moveDown, this.canvas);
  }

  checkBallPlayerCollision(ball) {
    const distanceToPlayer = Math.hypot(
      ball.x - this.player.x,
      ball.y - this.player.y
    );
    if (distanceToPlayer < ball.radius + this.player.radius) {
      this.lives--;
      this.updateLives();

      if (this.lives > 0) {
        this.player.y = this.canvas.height / 2;
      } else {
        alert("Game Over!");
        this.lives = 3;
        this.resetGame();
      }
    }
  }

  handleBallWrapAround(ball) {
    if (ball.x - ball.radius < 0) {
      ball.x = this.canvas.width + ball.radius;
    }

    if (ball.y - ball.radius < 0 || ball.y + ball.radius > this.canvas.height) {
      ball.y =
        Math.random() * (this.canvas.height - 2 * ball.radius) + ball.radius;
    }
  }

  checkBulletBallCollisions(bullet, bulletIndex) {
    this.ballEnemies.forEach((ball, ballIndex) => {
      if (
        bullet.x < ball.x + ball.radius &&
        bullet.x + bullet.width > ball.x - ball.radius &&
        bullet.y < ball.y + ball.radius &&
        bullet.y + bullet.height > ball.y - ball.radius
      ) {
        this.bullets.splice(bulletIndex, 1);
        this.ballEnemies.splice(ballIndex, 1);

        this.score += 100;
        this.updateScore();

        this.createBallEnemies(1);
      }
    });
  }

  checkPlayerSquareEnemyCollision(squareEnemy) {
    const distanceToPlayer = Math.hypot(
      squareEnemy.x - this.player.x,
      squareEnemy.y - this.player.y
    );

    if (distanceToPlayer < squareEnemy.width && !squareEnemy.markedForRemoval) {
      this.lives--;
      this.updateLives();

      if (this.lives > 0) {
        this.player.y = this.canvas.height / 2;
      } else {
        alert("Game Over!");
        this.lives = 3;
        this.resetGame();
      }
    }
  }

  checkBulletSquareEnemyCollisions(squareEnemy) {
    this.bullets.forEach((bullet, bulletIndex) => {
      if (
        bullet.x < squareEnemy.x + squareEnemy.width &&
        bullet.x + bullet.width > squareEnemy.x &&
        bullet.y < squareEnemy.y + squareEnemy.height &&
        bullet.y + bullet.height > squareEnemy.y
      ) {
        this.bullets.splice(bulletIndex, 1);
        squareEnemy.takeDamage();

        if (squareEnemy.markedForRemoval) {
          this.squareEnemies.splice(this.squareEnemies.indexOf(squareEnemy), 1);
          this.score += 300;
          this.updateScore();
          this.createSquareEnemies(1);
        }
      }
    });
  }

  handleSquareEnemyWrapAround(squareEnemy) {
    if (squareEnemy.x < 0) {
      squareEnemy.x = this.canvas.width;
      squareEnemy.y =
        Math.random() * (this.canvas.height - 2 * squareEnemy.height) +
        squareEnemy.height;
      squareEnemy.health = 3;
    }
  }

  handleKeyUp(event) {
    switch (event.code) {
      case "ArrowUp":
        this.moveUp = false;
        break;
      case "ArrowDown":
        this.moveDown = false;
        break;
    }
  }

  handleKeyDown(event) {
    switch (event.code) {
      case "ArrowUp":
        this.moveUp = true;
        break;
      case "ArrowDown":
        this.moveDown = true;
        break;
      case "Space":
        this.shootBullet();
        break;
    }
  }
}

export default Game;

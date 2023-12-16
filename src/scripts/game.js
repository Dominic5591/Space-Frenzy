import Ball from "./ball";

class Game {
  constructor() {
    this.canvas = document.getElementById("game-container");
    this.ctx = this.canvas.getContext("2d");
    this.balls = [];
    this.score = 0;
    this.missedClicks = 0;

    this.canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
    this.createBalls(1);
    this.updateGame();
  }

  createBalls(numberOfBalls) {
    for (let i = 0; i < numberOfBalls; i++) {
      this.balls.push(new Ball(this.canvas, this.ctx));
    }
  }

  resetGame() {
    this.balls.length = 0;
    this.score = 0;
    this.missedClicks = 0;
    this.createBalls(1);
  }

  updateGame() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.balls.forEach((ball) => {
      ball.draw();

      ball.x += ball.dx;
      ball.y += ball.dy;
      if (
        ball.x - ball.radius < 0 ||
        ball.x + ball.radius > this.canvas.width
      ) {
        ball.dx = -ball.dx;
      }

      if (
        ball.y - ball.radius < 0 ||
        ball.y + ball.radius > this.canvas.height
      ) {
        ball.dy = -ball.dy;
      }
      this.balls.forEach((otherBall) => {
        if (ball !== otherBall) {
          const distance = Math.hypot(
            ball.x - otherBall.x,
            ball.y - otherBall.y
          );

          if (distance < ball.radius + otherBall.radius) {
            const tempDx = ball.dx;
            ball.dx = otherBall.dx;
            otherBall.dx = tempDx;

            const tempDy = ball.dy;
            ball.dy = otherBall.dy;
            otherBall.dy = tempDy;
          }
        }
      });
    });

    requestAnimationFrame(this.updateGame.bind(this));
  }

  handleMouseDown(event) {
    const rect = this.canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    let ballClickedIndex = -1;

    this.balls.forEach((ball, index) => {
      const distance = Math.hypot(clickX - ball.x, clickY - ball.y);
      if (distance <= ball.radius && !ball.markedForRemoval) {
        this.score += 100;
        ball.markedForRemoval = true;
        ballClickedIndex = index;
      }
    });

    if (ballClickedIndex !== -1) {
      this.balls.splice(ballClickedIndex, 1);
      this.createBalls(1);
    } else {
      this.missedClicks++;
      if (this.missedClicks === 3) {
        alert("Game over! " + this.score);
        this.resetGame();
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  new Game();
});

export default Game;

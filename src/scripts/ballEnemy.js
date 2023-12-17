class BallEnemy {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.radius = 20;
    this.speed = 5;
    this.x = this.canvas.width;
    this.y =
      Math.random() * (this.canvas.height - 2 * this.radius) + this.radius;
    this.health = 1;
    this.markedForRemoval = false;
  }

  move() {
    this.x -= this.speed;

    if (this.x < 0 || this.health <= 0) {
      this.x = this.canvas.width;
      this.y =
        Math.random() * (this.canvas.height - 2 * this.radius) + this.radius;
      this.health = 1;
      this.color = "red";
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = "red";

    if (this.markedForRemoval) {
      this.radius += 2;
    }

    this.ctx.fill();
    this.ctx.closePath();

    if (this.radius > this.clickRadius || this.markedForRemoval) {
      this.create();
    }
  }

  create() {
    this.x = this.canvas.width;
    this.y =
      Math.random() * (this.canvas.height - 2 * this.radius) + this.radius;
    this.radius = 20;
    this.speed = 1;
    this.color = this.getRandomColor();
    this.markedForRemoval = false;
  }
}

export default BallEnemy;

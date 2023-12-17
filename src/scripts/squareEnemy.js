class SquareEnemy {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = 40;
    this.height = 40;
    this.speed = 3;
    this.x = this.canvas.width;
    this.y =
      Math.random() * (this.canvas.height - 2 * this.height) + this.height;
    this.color = "yellow";
    this.health = 3;
    this.markedForRemoval = false;
  }

  move() {
    this.x -= this.speed;

    if (this.x < 0 || this.health <= 0) {
      this.x = this.canvas.width;
      this.y =
        Math.random() * (this.canvas.height - 2 * this.height) + this.height;
      this.health = 3;
    }
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  takeDamage() {
    this.health--;

    if (this.health <= 0) {
      this.markedForRemoval = true;
    }
  }

  create() {
    this.x = this.canvas.width;
    this.y =
      Math.random() * (this.canvas.height - 2 * this.height) + this.height;
    this.width = 40;
    this.height = 40;
    this.speed = 3;
    this.color = "yellow";
    this.health = 3;
    this.markedForRemoval = false;
  }
}

export default SquareEnemy;

class Player {
  constructor(canvas, ctx) {
    this.x = 50;
    this.y = canvas.height / 2;
    this.radius = 20;
    this.speed = 5;
    this.bulletWidth = 10;
    this.bulletHeight = 5;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x + this.radius, this.y);
    this.ctx.lineTo(this.x - this.radius, this.y + this.radius);
    this.ctx.lineTo(this.x - this.radius, this.y - this.radius);
    this.ctx.fillStyle = "blue";
    this.ctx.fill();
    this.ctx.closePath();
  }

  handleMovement(moveUp, moveDown, canvas) {
    if (moveUp) {
      this.y -= this.speed;
    }
    if (moveDown) {
      this.y += this.speed;
    }

    if (this.y - this.radius > canvas.height) {
      this.y = -this.radius;
    }
    if (this.y + this.radius < 0) {
      this.y = canvas.height + this.radius;
    }
  }
}

export default Player;

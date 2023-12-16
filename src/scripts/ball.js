class Ball {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.radius = 20;
    this.clickRadius = 40;
    this.x = Math.random() * (canvas.width - 2 * this.radius) + this.radius;
    this.y = Math.random() * (canvas.height - 2 * this.radius) + this.radius;
    this.dx = (Math.random() - 0.5) * 4;
    this.dy = (Math.random() - 0.5) * 4;
    this.color = this.getRandomColor();
    this.markedForRemoval = false;
  }

  getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;

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
    this.x =
      Math.random() * (this.canvas.width - 2 * this.radius) + this.radius;
    this.y =
      Math.random() * (this.canvas.height - 2 * this.radius) + this.radius;
    this.radius = 20;
    this.dx = (Math.random() - 0.5) * 4;
    this.dy = (Math.random() - 0.5) * 4;
    this.color = this.getRandomColor();
    this.markedForRemoval = false;
  }
}
export default Ball;

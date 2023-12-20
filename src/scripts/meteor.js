class Meteor {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.health = 3;
    this.speed = 3.5;
    this.x = this.canvas.width;
    this.y = Math.random() * (this.canvas.height - 2 * this.height) + this.height;
    this.marked = false;
    this.sprite = new Image()
    this.sprite.src = './assets/icons8-stone-100.png'
    this.width = 40;
    this.height = 40;
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
    this.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
  }

  takeDamage() {
    this.health--;

    if (this.health <= 0) {
      this.marked = true;
    }
  }
}

export default Meteor;

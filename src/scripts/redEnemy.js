
class RedEnemy {
  constructor(canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx
    this.health = 1
    this.speed = 4.5
    this.radius = 20
    this.x = this.canvas.width
    this.y = Math.random() * (this.canvas.height - 2 * this.radius) + this.radius //random y axis spawn location, spawns on from the right side but this randomomizes the location of up and down
    this.marked = false //check if enemy should be removed
    this.image = new Image()
    this.image.src = './assets/enemy1.png'
    this.width = 40;
    this.height = 40;
  }

  move() {
    this.x -= this.speed
  
    if (this.x < 0 || this.health <= 0) {
      this.x = this.canvas.width
      this.y = Math.random() * (this.canvas.height - 2 * this.radius) + this.radius
    }
  }

  draw() {
    this.ctx.drawImage(this.image, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }

  takeDamage() {
    this.health--

    if (this.health <= 0) {
      this.marked = true
    }
  }
}
export default RedEnemy
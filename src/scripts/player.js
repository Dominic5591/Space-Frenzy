class Player {
  constructor(canvas, ctx) {
    this.x = 50
    this.y = canvas.height / 2
    this.radius = 20
    this.speed = 3.5
    this.bulletWidth = 20
    this.bulletHeight = 10 


    this.sprite = new Image();
    this.sprite.src = './assets/player.png'
    this.width = 50; // Adjust based on the actual sprite dimensions
    this.height = 50; 
    this.ctx = ctx
    this.shield = false // player shield on respawn
    this.shieldTime = 3000

  }

  draw() {
    this.ctx.drawImage(this.sprite, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    if (this.shield) {
      const shieldRadius = this.radius + 10; //  size of shield
      const alpha = 0.5 // transparency of the shield

      this.ctx.beginPath()
      this.ctx.arc(this.x, this.y, shieldRadius, 0, 2 * Math.PI)
      this.ctx.fillStyle = `rgba(0, 255, 187, ${alpha})`
      this.ctx.fill()
      this.ctx.closePath()
    }
  }

  handleMovement(moveUp, moveDown, canvas) {
    if (moveUp) this.y -= this.speed
    if (moveDown) this.y += this.speed
    if (this.y - this.radius > canvas.height) this.y = -this.radius 
    if (this.y + this.radius < 0) this.y = canvas.height + this.radius 
  }

  // method for adding shield when you lose a life, 3 second invincibility 
  respawn() { 
    this.shield = true
    setTimeout(() => {
      this.shield = false
    }, 3000);
  }
}

export default Player

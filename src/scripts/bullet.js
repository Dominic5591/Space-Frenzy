// bullet.js
class Bullet {
  constructor(player) {
    this.x = player.x + player.radius;
    this.y = player.y;
    this.width = player.bulletWidth;
    this.height = player.bulletHeight;
    this.speed = 10;
  }

  draw(ctx) {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default Bullet;

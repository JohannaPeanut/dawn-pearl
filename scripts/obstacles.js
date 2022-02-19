class Obstacle {
  constructor(gameInstance, x, y, width, height) {
    this.game = gameInstance;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    this.game.context.save();
    this.game.context.fillStyle = 'black';
    this.game.context.fillRect(this.x, this.y, this.width, this.height);
    this.game.context.restore();
  }
}

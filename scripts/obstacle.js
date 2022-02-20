class Obstacle {
  constructor(gameInstance, x, y, height) {
    this.game = gameInstance;
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = height;
  }

  draw() {
    this.game.context.save();
    this.game.context.fillStyle = 'black';
    this.game.context.fillRect(this.x, this.y, this.width, this.height);
    this.game.context.restore();
  }

  checkCollision(element) {
    // We'll use this to check for intersections between player and obstacle
    return (
      //problem: certain obstacles are not checked at the top end
      // is right edge of element in front of left edge of enemy
      element.x + element.radius > this.x &&
      // is left edge of element before of right edge of enemy
      element.x - element.radius < this.x + this.width &&
      // is bottom edge of element below top edge of enemy
      element.y + element.radius > this.y &&
      // is top edge of element above bottom edge of enemy
      element.y - element.radius < this.y + this.height
    );
  }
}

class Obstacle {
  constructor(gameInstance, x, y, height, move) {
    this.game = gameInstance;
    this.x = x;
    this.y = y;
    this.width = 15;
    this.height = height;
    if (move) {
      this.isMoving = true;
      console.log("true")
    } else {
      this.isMoving = false
      console.log("false")
    }
  }

  runLogic() {
    if (this.isMoving) {
      if (this.y < this.game.canvas.height) {
        this.y += 3;
      } else {
        this.y = 0 - this.height;
      }
    }
  }

  draw() {
    this.game.context.save();
    this.game.context.strokeStyle = 'white';
    this.game.context.lineWidth = 3;
    //this.game.context.fillRect(this.x, this.y, this.width, this.height);
    this.game.context.beginPath();
    this.game.context.lineTo(this.x, this.y);
    this.game.context.lineTo(this.x + this.width, this.y);
    this.game.context.lineTo(this.x + this.width, this.y + this.height);
    this.game.context.lineTo(this.x, this.y + this.height);
    this.game.context.closePath();
    this.game.context.stroke();
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

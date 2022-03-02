class mousePlayer {
  constructor(gameInstance) {
    this.game = gameInstance;
    this.x = 0;
    this.y = 0;
    this.isDown = false;
    this.isDraggingBall = false;
  }
  draw() {}

  runLogic() {
    if (
      !this.isDown ||
      this.x < 0 ||
      this.x > this.game.context.width ||
      this.y < 0 ||
      this.y > this.game.context.height
    ) {
      this.loseConnection();
    } else {
      for (let ball of this.game.balls) {
        if (this.checkCollisionWithBall(ball)) {
          if (!this.isDraggingBall) {
            this.isDraggingBall = true;
            this.draggedBall = ball;
          }
        }
      }
    }
  }
  loseConnection() {
      this.isDraggingBall = false;
      this.draggedBall = '';
  }

  checkCollisionWithBall(element) {
    // check if mouse is clicked inside the radius of the ball
    return (
      element.x + element.radius > this.x &&
      element.x - element.radius < this.x &&
      element.y + element.radius > this.y &&
      element.y - element.radius < this.y
    );
  }
}
/* checkCollision(element) {
  // check for intersections between player and ball
  return (
    // is right edge of element in front of left edge of ball
    element.x + element.radius > this.x - this.radius &&
    // is left edge of element before of right edge of ball
    element.x - element.radius < this.x + this.radius &&
    // is bottom edge of element below top edge of ball
    element.y + element.radius > this.y - this.radius &&
    // is top edge of element above bottom edge of ball
    element.y - element.radius < this.y + this.radius
  );
} */

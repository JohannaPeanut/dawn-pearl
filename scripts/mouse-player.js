class mousePlayer {
  constructor(gameInstance) {
    this.game = gameInstance;
    this.x = 0;
    this.y = 0;
    this.isDown = false;
    this.isDraggingBall = false;
  }
  draw() {
    
  }

  runLogic() {
    if (this.isDown) {
      if (this.checkCollisionWithBall()) {
        if (!this.isDraggingBall) this.isDraggingBall = true;
      }
    }
  }

  checkCollisionWithBall() {
    // check if mouse is clicked inside the radius of the ball
    return (
      this.game.ball.x + this.game.ball.radius > this.x &&
      this.game.ball.x - this.game.ball.radius < this.x &&
      this.game.ball.y + this.game.ball.radius > this.y &&
      this.game.ball.y - this.game.ball.radius < this.y
    );
  }

}

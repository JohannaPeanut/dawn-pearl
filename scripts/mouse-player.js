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
    this.y = clamp(this.y, this.game.ball.radius, this.game.canvas.height - this.game.ball.radius);
    this.x = clamp(this.x, this.game.ball.radius, this.game.canvas.width - this.game.ball.radius);
    if (this.isDown) {
      if (this.checkCollisionWithBall() && this.game.ball.y > this.game.canvas.height* 0.75) {
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

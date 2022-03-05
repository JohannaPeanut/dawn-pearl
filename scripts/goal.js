class Goal {
  constructor(gameInstance, x, y) {
    this.game = gameInstance;
    this.radius = 30;
    this.x = x;
    this.y = y;
    this.hit = false;
    this.ballInGoal = '';
  }

  draw() {
    this.game.context.save();
    this.game.context.strokeStyle = 'white';
    this.game.context.lineWidth = 1;
    this.game.context.beginPath();
    this.game.context.drawImage(
      holeImage,
      this.x - this.radius,
      this.y - this.radius
    );
    /* if(this.hit) game.context.arc(this.x, this.y, this.radius-1.8, 0, 2 * Math.PI);  */
    this.game.context.closePath();
    this.game.context.stroke();
    this.game.context.restore();
  }

  checkCollisionWithBall(ball) {
    //

    return (
      !this.hit &&
      // is right edge of element in front of left edge of enemy
      ball.x + ball.radius > this.x &&
      // is left edge of element before of right edge of enemy
      ball.x - ball.radius < this.x &&
      // is bottom edge of element below top edge of enemy
      ball.y + ball.radius > this.y &&
      // is top edge of element above bottom edge of enemy
      ball.y - ball.radius < this.y
    );
  }
}

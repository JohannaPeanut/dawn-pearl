class Goal {
  constructor(gameInstance) {
    this.game = gameInstance;
    this.radius = this.game.ball.radius + 10;
    this.x = this.radius;
    this.y = 50;
    this.hit = false;
  }

  hitGoal() {}

  runLogic() {
    if (this.checkCollisionWithBall()) {
      this.hit = true;
      this.game.ball.connection = false;
    }
  }

  draw() {
    this.game.context.save();
    this.game.context.fillStyle = 'black';
    this.game.context.beginPath();
    game.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.game.context.closePath();
    this.game.context.fill();
    this.game.context.fillRect(
      this.x - this.radius,
      this.y - this.radius,
      this.radius,
      this.radius * 2
    );
    this.game.context.restore();
  }

  checkCollisionWithBall() {
    //
    return (
      // is right edge of element in front of left edge of enemy
      this.game.ball.x + this.game.ball.radius > this.x &&
      // is left edge of element before of right edge of enemy
      this.game.ball.x - this.game.ball.radius < this.x &&
      // is bottom edge of element below top edge of enemy
      this.game.ball.y + this.game.ball.radius > this.y &&
      // is top edge of element above bottom edge of enemy
      this.game.ball.y - this.game.ball.radius < this.y
    );
  }
}

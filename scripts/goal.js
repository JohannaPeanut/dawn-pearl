class Goal {
  constructor(gameInstance) {
    this.game = gameInstance;
    this.radius = 20 + 10;
    this.x = 70;
    this.y = 70;
    this.hit = false;
    this.ballInGoal = '';
  }

  hitGoal() {}

  runLogic() {}

  draw() {
    this.game.context.save();
    this.game.context.strokeStyle = 'white';
    this.game.context.lineWidth = 3;
    this.game.context.beginPath();
    game.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.game.context.closePath();
    this.game.context.stroke();
    this.game.context.restore();
  }

  checkCollisionWithBall(ball) {
    //

    return (
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

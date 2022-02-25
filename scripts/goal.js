class Goal {
  constructor(gameInstance) {
    this.game = gameInstance;
    this.radius = 20 + 10;
    this.x = 70;
    this.y = 70;
    this.hit = false;
  }

  hitGoal() {}

  runLogic() {
    if (this.checkCollisionWithBall()) {
      
        this.hit = true;
    }
  }

  draw() {
    this.game.context.save();
    this.game.context.strokeStyle = 'white';
    this.game.context.lineWidth = 3;
    this.game.context.beginPath();
    game.context.arc(this.x , this.y, this.radius, 0, 2 * Math.PI);
    this.game.context.closePath();
    this.game.context.stroke();
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

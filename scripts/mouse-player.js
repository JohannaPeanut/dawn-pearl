class mousePlayer {
  constructor(gameInstance) {
    this.game = gameInstance;
    this.size = 5;
    this.isDown = false;
    this.isDragingBall = false;
  }
  draw() {
    //this.context.fillStyle = 'red';
    //this.context.fillRect(this.x, this.y, this.size, this.size);
  }

  runLogic() {
    if (this.isDown) {
      if (this.checkCollisionWithBall()) {
        console.log('touches ball');
        this.isDragingBall = true;
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

  drawLine(x1, y1, x2, y2) {
    this.game.context.save();
    this.game.context.beginPath();
    this.game.context.strokeStyle = 'black';
    this.game.context.lineWidth = this.size;
    this.game.context.moveTo(x1, y1);
    this.game.context.lineTo(x2, y2);
    this.game.context.stroke();
    this.game.context.closePath();
    this.game.context.restore();
  }
}

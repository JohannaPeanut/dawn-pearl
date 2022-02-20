class Ball {
  constructor(gameInstance) {
    this.game = gameInstance;
    this.radius = 20;
    this.x = 50;
    this.y = this.game.canvas.height - this.radius - 200;
    this.player = this.game.player;
    this.connection = false;
  }

  runLogic() {
    if (this.checkCollision(this.player) && this.connection === false) {
      this.connection = true;
    }
    if (this.connection && this.game.goal.hit === false) {
      this.runLogicConnected();
    } else if (this.connection === false && this.game.goal.hit === false) {
      this.runLogicDisconnected();
    } else {
        this.runLogicHitGoal();
    }
  }

  runLogicConnected() {
    this.x = this.player.x;
    this.y = this.player.y - this.player.radius - this.radius;
  }

  runLogicDisconnected() {
    if (this.y <= this.game.canvas.height - this.radius) {
      this.y += 3;
    }
  }

  runLogicHitGoal() {
    this.x = this.game.goal.x;
    this.y = this.game.goal.y;
  }

  loseConnection() {
    if (this.connection === true) {
      this.connection = false;
      this.x += 2 * this.radius + 2; //problem: at the moment always "falls" to the right/ should fall to the left in case obstacle is on the right
    }
  }

  draw() {
    this.game.context.save();
    this.game.context.fillStyle = 'red';
    this.game.context.beginPath();
    game.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.game.context.closePath();
    this.game.context.fill();
    this.game.context.restore();
  }

  checkCollision(element) {
    // We'll use this to check for intersections between player and ball
    return (
      // is right edge of element in front of left edge of enemy
      element.x + element.radius > this.x - this.radius &&
      // is left edge of element before of right edge of enemy
      element.x - element.radius < this.x + this.radius &&
      // is bottom edge of element below top edge of enemy
      element.y + element.radius > this.y - this.radius &&
      // is top edge of element above bottom edge of enemy
      element.y - element.radius < this.y + this.radius
    );
  }
}

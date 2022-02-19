class Player {
  constructor(gameInstance) {
    this.game = gameInstance;
    this.x = 0;
    this.y = 200;
    //this.y = 400;
    this.radius = 20;
    this.speedY = 40;
    this.speedX = 40;
    this.uplift = 10;
    this.accelerationX = 0;
    this.accelerationY = 0;
    this.friction = 0.1;

    //this.frame = 1;
  }

  //make player constantly "fall" until she hits the bottom
  runLogic() {
    const keys = this.game.keysDown;
    for (const key of keys) {
      switch (key) {
        case 'ArrowUp':
          if (this.y - this.radius > 0 + this.uplift) {
            this.accelerationY = -1.5;
          } else {
            this.y = 0 + this.radius;
          }
          break;
        case 'ArrowRight':
          if (this.x + this.radius <= this.game.canvas.width - this.uplift) {
            this.accelerationX = +1.5;
          } else {
            this.x = this.game.canvas.width - this.radius; // problem: ball disappears
          }
          break;
        case 'ArrowLeft':
          if (this.x - this.radius > 0 + this.uplift) {
            this.accelerationX = -1.5;
          } else {
            this.x = 0 + this.radius; // problem: ball disappears
          }
          break;
      }
    }

    const { x, y, speedX, speedY, accelerationX, accelerationY, friction } =
      this;
    let newAccelerationY = accelerationY * (1 - friction);
    let newAccelerationX = accelerationX * (1 - friction);
    let newSpeedX = speedX * (1 - friction * 3) + newAccelerationX;
    let newSpeedY = speedY * (1 - friction * 3) + newAccelerationY;
    let newX = x + newSpeedX;
    let newY = y + newSpeedY;
    for (let obstacle of this.game.obstacles) {
      const horizontalCollision = obstacle.checkCollision({
        ...this,
        x: newX
      });
      const verticalCollision = obstacle.checkCollision({
        ...this,
        y: newY
      });
      if (verticalCollision) {
        newSpeedY = 0;
        newY = y;
      }
      if (horizontalCollision) {
        newSpeedX = 0;
        newX = x;
      }
    }
    /*
    this.x = newX;
    this.y = newY;
    this.speedX = newSpeedX;
    this.speedY = newSpeedY;
    this.accelerationX = newAccelerationX;
    this.accelerationY = newAccelerationY;
    */
    Object.assign(this, {
      x: newX,
      y: newY,
      speedX: newSpeedX,
      speedY: newSpeedY,
      accelerationX: newAccelerationX,
      accelerationY: newAccelerationY
    });
  }

  draw() {
    this.game.context.save();
    this.game.context.fillStyle = 'blue';
    this.game.context.beginPath();
    game.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.game.context.closePath();
    this.game.context.fill();
    this.game.context.restore();
    //this.frame++;
    //this.game.context.save();
    //this.game.context.restore();
  }
}

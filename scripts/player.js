class Player {
  constructor(gameInstance) {
    this.game = gameInstance;
    this.x = 400; //problem: why is ball not starting at actual x position when I change speed/acc?
    this.y = 400;
    this.radius = 20;
    this.speedY = 0;
    this.speedX = 0;
    this.accelerationX = 0;
    this.accelerationY = 0;
    this.friction = 0.1;
  }

  runLogic() {
    //gravity
    if (this.y + this.radius + this.accelerationY < this.game.canvas.height) {
      this.accelerationY = +0.3; 
    }else {
      this.y = this.game.canvas.height - this.radius;
    }
    //player control
    const keys = this.game.keysDown;
    for (const key of keys) {
      switch (key) {
        case 'ArrowUp':
          if (this.y - this.radius > 0) {
            this.accelerationY = -1;
          } else {
            this.y = 0 + this.radius;
          }
          break;
        case 'ArrowRight':
          if (this.x + this.radius <= this.game.canvas.width) {
            this.accelerationX = +0.5;
          } else {
            this.x = this.game.canvas.width - this.radius; // problem: ball disappears
          }
          break;
        case 'ArrowLeft':
          if (this.x - this.radius > 0) {
            this.accelerationX = -0.5;
          } else {
            this.x = 0 + this.radius; // problem: ball disappears
          }
          break;
        case 'ArrowDown':
          this.accelerationY = +0.5; // only added arrow down for testing

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
        this.game.ball.loseConnection();
      }
      if (horizontalCollision) {
        newSpeedX = 0;
        newX = x;
        this.game.ball.loseConnection();
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
  }
}

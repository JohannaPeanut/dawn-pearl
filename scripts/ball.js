const clamp = (value, min, max) => Math.max(Math.min(value, max), min);

const fps = 60;
class Ball {
  constructor(gameInstance, x, y, color) {
    this.game = gameInstance;
    this.color = color;
    this.player = this.game.player;
    this.radius = 20;
    this.x = x;
    this.y = y; //this.game.canvas.height - this.radius - 200;
    this.speedY = 100; // pixels per second
    this.speedX = 80; // pixels per second
    this.gravity = 2000; // pixels per second squared, accelerationY
    this.accelerationX = 0; // pixels per second squared
    this.hitGoal = '';
  }

  runLogic() {
    //problem wenn player mit obstacle kollidiert und gleichzeitig mit ball (diesen also aufnehmen will)
    // problem solved maybe if player cant pick up ball when it is intersecting with obstacles
    //tried avoid that buggy behavior with this.game.canvas.height - 1.5 * this.radius but then player cannot pick up ball when it is jumping....
    this.y = clamp(this.y, this.radius, this.game.canvas.height - this.radius);
    this.x = clamp(this.x, this.radius, this.game.canvas.width - this.radius);

    this.speedY = clamp(this.speedY, -1500, 1500);
    this.speedX = clamp(this.speedX, -1500, 1500);

    for (let goal of this.game.goals) {
      if (goal.checkCollisionWithBall(this)) {
        goal.hit = true;
        goal.ballInGoal = this;
        this.hitGoal = goal;
        this.game.mousePlayer.loseConnection();
      }
    }

    if (this.game.mousePlayer.draggedBall !== this && this.hitGoal === '') {
      this.runLogicDisconnected();
    } else if (
      this.hitGoal === '' &&
      this.game.mousePlayer.isDraggingBall &&
      this.game.mousePlayer.draggedBall === this
    ) {
      this.runLogicMouse();
    } else if (this.hitGoal !== '') {
      this.runLogicHitGoal();
    }
  }

  runLogicDisconnected() {
    this.speedY += this.gravity / fps;
    this.speedX += this.accelerationX / fps;

    this.y += this.speedY / fps;
    this.x += this.speedX / fps;

    //respect borders of canvas
    if (
      this.y + this.radius > this.game.canvas.height ||
      this.y - this.radius < 0
    ) {
      this.speedY = this.speedY * -0.94;
    }
    if (
      this.x + this.radius > this.game.canvas.width ||
      this.x - this.radius < 0
    ) {
      this.speedX = this.speedX * -0.94;
    }
    //check for obstacle collisions
    for (let obstacle of this.game.obstacles) {
      if (this.checkCollisionWithObstacle(obstacle)) {
        const intersectingObstacle = this.whichObstale();
        if (intersectingObstacle.x < this.x) {
          //if intersecting obstacle is left from ball --> new clamp for right side of obstacle
          this.x = clamp(
            this.x,
            this.radius + intersectingObstacle.x + intersectingObstacle.width,
            this.game.canvas.width - this.radius
          );
          this.speedX = this.speedX * -0.5;
        } else {
          //if intersecting obstacle is right from ball --> new clamp for left side of obstacle
          this.x = clamp(
            this.x,
            this.radius,
            intersectingObstacle.x - this.radius
          );
          this.speedX = this.speedX * -0.5;
        }
      }
    }
  }

  runLogicHitGoal() {
    this.x = this.hitGoal.x;
    this.y = this.hitGoal.y;
  }

  runLogicMouse() {
    let deltaY = this.game.mousePlayer.y - this.y;
    let deltaX = this.game.mousePlayer.x - this.x;

    this.speedX = deltaX * 10;
    this.speedY = deltaY * 10;

    let newy = this.y + this.speedY / fps;
    newy -= this.radius / 5;
    let newx = this.x + this.speedX / fps;

    if (deltaX > 300 || deltaX < -300) {
      this.game.mousePlayer.loseConnection();
    } else {
      this.y = newy;
      this.x = newx;

      for (let obstacle of this.game.obstacles) {
        if (obstacle.checkCollision(this)) {
          this.game.mousePlayer.loseConnection();
          const intersectingObstacle = this.whichObstale();
          if (intersectingObstacle.x < this.x) {
            this.x = clamp(
              this.x,
              this.radius + intersectingObstacle.x + intersectingObstacle.width,
              this.game.canvas.width - this.radius
            );
            this.game.mousePlayer.loseConnection();
            this.game.mousePlayer.isDown = false;
            this.speedX = this.speedX * -0.8;
            this.speedY = this.speedY * -0.8;
          } else {
            this.x = clamp(
              this.x,
              this.radius,
              intersectingObstacle.x - this.radius
            );
            this.game.mousePlayer.loseConnection();
            this.game.mousePlayer.isDown = false;
            this.speedX = this.speedX * -0.8;
            this.speedY = this.speedY * -0.8;
          }
          // klonkSound.play();
        }
      }
    }
  }

  draw() {
    this.game.context.save();
    this.game.context.fillStyle = this.color;
    this.game.context.beginPath();
    game.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.game.context.closePath();
    this.game.context.fill();
    this.game.context.restore();
  }

  checkCollisionWithObstacle(element) {
    // We'll use this to check for intersections between player and obstacle
    return (
      //problem: certain obstacles are not checked at the top end
      // is right edge of element in front of left edge of enemy
      this.x + this.radius > element.x &&
      // is left edge of element before of right edge of enemy
      this.x - this.radius < element.x + element.width &&
      // is bottom edge of element below top edge of enemy
      this.y + this.radius > element.y &&
      // is top edge of element above bottom edge of enemy
      this.y - this.radius < element.y + element.height
    );
  }

  checkCollision(element) {
    // check for intersections between player and ball
    return (
      // is right edge of element in front of left edge of ball
      element.x + element.radius > this.x - this.radius &&
      // is left edge of element before of right edge of ball
      element.x - element.radius < this.x + this.radius &&
      // is bottom edge of element below top edge of ball
      element.y + element.radius > this.y - this.radius &&
      // is top edge of element above bottom edge of ball
      element.y - element.radius < this.y + this.radius
    );
  }

  whichObstale() {
    for (let obstacle of this.game.obstacles) {
      if (obstacle.checkCollision(this)) return obstacle; //returns intersecting obstacle instance
    }
  }
}

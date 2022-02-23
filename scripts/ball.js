const clamp = (value, min, max) => Math.max(Math.min(value, max), min);
const fps = 60;
class Ball {
  constructor(gameInstance) {
    this.game = gameInstance;
    this.player = this.game.player;
    this.radius = 20;
    this.x = 400;
    this.y = 200; //this.game.canvas.height - this.radius - 200;
    this.speedY = 100; // pixels per second
    this.speedX = 50; // pixels per second
    this.gravity = 4000; // pixels per second squared, accelerationY
    this.accelerationX = 0; // pixels per second squared
    this.connection = false;
  }

  runLogic() {
    //problem wenn player mit obstacle kollidiert und gleichzeitig mit ball (diesen also aufnehmen will)
    if (
      this.checkCollision(this.player) &&
      this.player.y > this.game.canvas.height - 1.5 * this.radius &&
      !this.connection
    ) {
      this.connection = true;
    }
    if (this.connection && !this.game.goal.hit) {
      this.runLogicConnected();
    } else if (!this.connection && !this.game.goal.hit) {
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
    this.y = clamp(this.y, this.radius, this.game.canvas.height - this.radius);
    this.x = clamp(this.x, this.radius, this.game.canvas.width - this.radius);

    this.speedY += this.gravity / fps;
    this.speedX += this.accelerationX / fps;

    this.y += this.speedY / fps;
    this.x += this.speedX / fps;

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
    /* if (this.y <= this.game.canvas.height - this.radius) {
      this.y += 3;
    } */
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
    /* //radial gradient
    const radgrad = this.game.context.createRadialGradient(
      this.x,this.y,this.radius-10, this.x+5,this.y+5,this.radius+10);
    radgrad.addColorStop(0, '#A7D30C');
    radgrad.addColorStop(0.9, '#019F62');
    radgrad.addColorStop(1, 'rgba(1,159,98,0)');
    this.game.context.fillStyle = radgrad;
    */
    this.game.context.fillStyle = 'red';
    this.game.context.beginPath();
    game.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.game.context.closePath();
    this.game.context.fill();
    this.game.context.restore();
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
}

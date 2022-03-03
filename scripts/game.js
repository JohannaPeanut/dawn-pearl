// Every class in our game architecture
// will have a runLogic method that is responsible
// for executing the logic for that game element
// and a draw method, that is responsible for drawing
// that element to the canvas
const canvasElement = document.querySelector('canvas');

const ballStartX = canvasElement.width - 50;
const ballStartY = 100;

const klonkSound = new Audio(
  'sounds/150101__peter-lustig__topf-03-massiv-klein-trocken.wav'
);

class Game {
  constructor(canvasElement, screens, level) {
    this.canvas = canvasElement;
    this.context = canvasElement.getContext('2d');

    this.mousePlayer = new mousePlayer(this);
    this.balls = [];
    this.goals = [];
    this.duration = 500; //sec*10
    this.startTime = 0;
    this.timer = this.duration;
    this.screens = screens;
    this.running = false;
    this.obstacles = [];
    this.keysDown = [];
    switch (level) {
      case 1:
        this.level = level1;
        break;
      case 2:
        this.level = level2;
        break;
      case 3:
        this.level = level3;
        break;
      case 4:
        this.level = level4;
        break;
      case 5:
        this.level = level5;
        break;
      default:
        break;
    }
  }

  start() {
    this.running = true;
    this.startTime = Date.now();
    this.timer = this.duration;
    this.createBalls();
    this.createGoals();
    for (let goal of this.goals) {
      goal.hit = false;
    }
    this.addObstacles();
    this.enableControls();
    this.displayScreen('playing');
    this.loop();
  }

  createBalls() {
    this.balls = [];
    const constructBalls = (ballArray) => {
      for (let ball of ballArray) {
        this.balls.push(new Ball(this, ball.x, ball.y, ball.color));
      }
    };
    constructBalls(this.level.balls);
  }

  createGoals() {
    this.goals = [];
    const constructGoals = (goalArray) => {
      for (let goal of goalArray) {
        this.goals.push(new Goal(this, goal.x, goal.y));
      }
    };
    constructGoals(this.level.goals);
  }

  displayScreen(name) {
    for (let screenName in this.screens) {
      this.screens[screenName].style.display = 'none';
    }
    this.screens[name].style.display = '';
  }

  lose() {
    this.running = false;
    this.displayScreen('end');
  }

  addObstacles() {
    const buildObstacles = (obstacleArray) => {
      for (let obstacle of obstacleArray) {
        this.obstacles.push(
          new Obstacle(
            this,
            obstacle.x,
            obstacle.y,
            obstacle.height,
            obstacle.move
          )
        );
      }
    };

    buildObstacles(this.level.obstacles);
  }

  enableControls() {
    if (this.running) {
      window.addEventListener('mousedown', (e) => {
        this.mousePlayer.isDown = true;
      });

      window.addEventListener('mousemove', (e) => {
        if (
          e.offsetX < 0 ||
          e.offsetX > this.canvas.width ||
          e.offsetY < 0 ||
          e.offsetY > this.canvas.height
        )
          this.mousePlayer.isDown = false;
        this.mousePlayer.x = e.offsetX;
        this.mousePlayer.y = e.offsetY;
      });

      window.addEventListener('mouseup', (e) => {
        if (this.mousePlayer.isDown) {
          this.mousePlayer.isDown = false;
          this.mousePlayer.isDraggingBall = false;
          this.mousePlayer.draggedBall = '';
          //this.canvas.classList.remove("mouseDown");
        }
      });
    }
  }

  loop() {
    window.requestAnimationFrame(() => {
      this.runLogic();
      this.draw();
      this.runTimer();
      if (this.running) this.loop();
    });
  }

  runTimer() {
    if (this.running) {
      const timePassed = Math.floor((Date.now() - this.startTime) / 100);
      if (this.timer > 0) {
        this.timer = this.duration - timePassed;
      } else {
        this.timer = 0;
      }
    }
  }

  runLogic() {
    this.mousePlayer.runLogic();
    for (let ball of this.balls) {
      //console.log(ball);
      ball.runLogic();
    }

    for (const obstacle of this.obstacles) {
      obstacle.runLogic();
    }

    for (let j = 0; j < this.balls.length; j++) {
      for (let i = 0; i < this.balls.length; i++) {
        if (
          this.balls[j] !== this.balls[i] &&
          this.balls[j].checkCollision(this.balls[i])
        ) {
          this.ballsHittingEachOther(i, j);
          // klonkSound.play();
          //break;
        }
      }
    }
    if (this.timer <= 0) this.lose();

    const allGoalsHit = () => {
      let solution = 0;
      for (let goal of this.goals) {
        if (goal.hit === true) solution += 1;
      }
      return solution === this.goals.length;
    };

    if (allGoalsHit()) {
      for (let ball of this.balls) {
        ball.runLogic();
      }
      this.draw();
      this.nextLevel();
    }

    if (this.mousePlayer.isDraggingBall) {
      this.canvas.classList.add('mouseDown');
      this.canvas.classList.remove('mouseUp');
    } else {
      this.canvas.classList.remove('mouseDown');
      this.canvas.classList.add('mouseUp');
    }
  }

  ballsHittingEachOther(i, j) {
    const obj1 = this.balls[i]; //problem with referencing / like this it only works with 2 balls
    const obj2 = this.balls[j];
    let vCollision = { x: obj2.x - obj1.x, y: obj2.y - obj1.y };
    let distance = Math.sqrt(
      (obj2.x - obj1.x) * (obj2.x - obj1.x) +
        (obj2.y - obj1.y) * (obj2.y - obj1.y)
    );
    let vCollisionNorm = {
      x: vCollision.x / distance,
      y: vCollision.y / distance
    };
    let vRelativeVelocity = {
      x: obj1.speedX - obj2.speedX,
      y: obj1.speedY - obj2.speedY
    };
    let speed =
      vRelativeVelocity.x * vCollisionNorm.x +
      vRelativeVelocity.y * vCollisionNorm.y;
    if (speed < 0) {
      obj1.x = obj1.x;
      obj1.y = obj1.y;
      obj2.x = obj2.x;
      obj2.y = obj2.y;
    } else {
      obj1.speedX -= speed * vCollisionNorm.x;
      obj1.speedY -= speed * vCollisionNorm.y;
      obj2.speedX += speed * vCollisionNorm.x;
      obj2.speedY += speed * vCollisionNorm.y;
    }
  }

  drawBackground() {
    this.context.save();
    const gradient = this.context.createLinearGradient(
      0,
      this.canvas.height,
      0,
      0
    );

    gradient.addColorStop(
      0,
      `rgba(255, 215, 0, ${1 - (this.timer / this.duration - 0.3)})`
    );
    gradient.addColorStop(
      0.2,
      `rgba(255, 248, 220, ${1 - (this.timer / this.duration - 0.3)})`
    );
    gradient.addColorStop(0.6, `rgba(128, 213, 252, 1)`);

    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = `rgba(0,0,0, ${this.timer / this.duration - 0.2})`;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.restore();
  }

  draw() {
    this.clean();
    this.drawBackground();
    for (let goal of this.goals) {
      goal.draw();
    }
    this.mousePlayer.draw();
    for (let ball of this.balls) {
      ball.draw();
    }

    for (const obstacle of this.obstacles) {
      obstacle.draw();
    }
    //this.context.clearRect(0, 0, 500, 500);
  }

  clean() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  nextLevel() {
    this.running = false;
    levelNo++;
    window.setTimeout(() => startNextLevel(levelNo), 3000);
  }
}

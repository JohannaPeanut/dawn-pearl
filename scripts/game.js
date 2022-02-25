// Every class in our game architecture
// will have a runLogic method that is responsible
// for executing the logic for that game element
// and a draw method, that is responsible for drawing
// that element to the canvas
const canvasElement = document.querySelector('canvas');

const ballStartX = canvasElement.width - 50;
const ballStartY = 100;

class Game {
  constructor(canvasElement, screens, level) {
    this.canvas = canvasElement;
    this.context = canvasElement.getContext('2d');
    this.level = level;
    this.player = new Player(this);
    this.mousePlayer = new mousePlayer(this);
    this.ball = new Ball(this);
    this.goal = new Goal(this);
    this.duration = 500; //sec*10
    this.startTime = 0;
    this.timer = this.duration;
    this.screens = screens;
    this.running = false;
    this.obstacles = [];
    this.keysDown = [];
  }

  start() {
    console.log(`level ${this.level} starts`);
    this.running = true;
    this.startTime = Date.now();
    this.timer = this.duration;
    this.goal.hit = false;
    this.ball.x = ballStartX;
    this.ball.y = ballStartY;

    this.addObstacles();
    this.enableControls();
    this.displayScreen('playing');
    this.loop();
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
    this.obstacles.push(
      new Obstacle(this, 200, 0, 200), //y value needs to be the upper end of obstacle!! (otherwise problem with collision test)
      new Obstacle(this, 350, 100, this.canvas.height),
      new Obstacle(this, 50, 250, this.canvas.height),
      new Obstacle(this, 450, 150, 130),
      new Obstacle(this, 150, 150, 130),
      new Obstacle(this, 700, 0, 200),
      new Obstacle(this, 700, 270, 200),
      //new Obstacle(this, 790, 180, 100),
      new Obstacle(this, 790, 180, 10),
      new Obstacle(this, 820, 180, 10)
    );
  }

  enableControls() {
    if (this.running) {
      const keysToPreventDefaultAction = ['ArrowUp', 'ArrowRight', 'ArrowLeft'];
      window.addEventListener('keydown', (event) => {
        if (keysToPreventDefaultAction.includes(event.code)) {
          event.preventDefault();
        }
        this.keysDown.push(event.code);
      });
      window.addEventListener('keyup', (event) => {
        this.keysDown = this.keysDown.filter((code) => code !== event.code);
      });

      window.addEventListener('mousedown', (e) => {
        this.mousePlayer.isDown = true;
      });

      window.addEventListener('mousemove', (e) => {
        this.mousePlayer.x = e.offsetX;
        this.mousePlayer.y = e.offsetY;
      });

      window.addEventListener('mouseup', (e) => {
        if (this.mousePlayer.isDown === true) {
          this.mousePlayer.isDown = false;
          this.mousePlayer.isDraggingBall = false;
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
    if(this.running) {
    const timePassed = Math.floor((Date.now() - this.startTime) / 100);
    if (this.timer > 0) {
      this.timer = this.duration - timePassed;
    } else {
      this.timer = 0;
    }
  }
  
    //this.context.font = '32px sans-serif';
    //this.context.fillText(this.timer, 150, 450);
  }

  runLogic() {
    this.player.runLogic();
    this.mousePlayer.runLogic();
    this.ball.runLogic();
    this.goal.runLogic();

    for (const obstacle of this.obstacles) {
      const obstacleAndPlayerCollision = obstacle.checkCollision(this.player);
      const enemyIsOutOfBounds = obstacle.x + obstacle.width < 0;
      if (obstacleAndPlayerCollision || enemyIsOutOfBounds) {
        console.log('collision!');
      }
    }

    if (this.timer <= 0) {
      this.lose();
    }

    if (this.goal.hit) {
      this.ball.runLogic();
      this.draw();
      this.nextLevel();
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
    this.goal.draw();
    this.player.draw();
    this.mousePlayer.draw();
    this.ball.draw();

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
    levelNo ++;
    window.setTimeout(() => startNextLevel(levelNo), 3000);
    
  }
}

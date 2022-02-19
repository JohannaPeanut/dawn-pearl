// Every class in our game architecture
// will have a runLogic method that is responsible
// for executing the logic for that game element
// and a draw method, that is responsible for drawing
// that element to the canvas

class Game {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.context = canvasElement.getContext('2d');
    this.player = new Player(this);
    this.obstacles = [];
    this.keysDown = [];
  }

  start() {
    this.addObstacles();
    this.enableControls();
    this.loop();
  }

  addObstacles() {
    this.obstacles.push(
      new Obstacle(this, 200, 0, 200), //y value needs to be the upper end of obstacle!! (otherwise problem with collision test)
      new Obstacle(this, 350, 100, this.canvas.height)
      // new Obstacle(this, -250, 150, 50),
      //new Obstacle(this, -150, 300, 50)
    );
  }

  enableControls() {
    /*
    window.addEventListener('keydown', (event) => {
      const code = event.code;
      switch (code) {
        case 'ArrowUp':
          event.preventDefault();
          if (this.player.y - this.player.radius >= 0 + this.player.uplift) {
            this.player.y -= this.player.uplift;
          }
          break;
        case 'ArrowRight':
          event.preventDefault();
          if (this.player.x + this.player.radius <= 650 - this.player.uplift) {
            this.player.x += this.player.uplift;
          }
          break;
        case 'ArrowLeft':
          event.preventDefault();
          if (this.player.x - this.player.radius >= 0 + this.player.uplift) {
            this.player.x -= this.player.uplift;
          }
          break;
      }
    });
    */
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
  }

  loop() {
    window.requestAnimationFrame(() => {
      this.runLogic();
      this.draw();
      this.loop();
    });
  }

  runLogic() {
    this.player.runLogic();

    for (const obstacle of this.obstacles) {
      const obstacleAndPlayerCollision = obstacle.checkCollision(this.player);
      const enemyIsOutOfBounds = obstacle.x + obstacle.width < 0;
      if (obstacleAndPlayerCollision || enemyIsOutOfBounds) {
        console.log('collision!');
      }
    }
  }

  draw() {
    this.clean();
    this.player.draw();
    for (const obstacle of this.obstacles) {
      obstacle.draw();
    }
    //this.context.clearRect(0, 0, 500, 500);
  }

  clean() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

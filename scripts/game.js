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
  }

  start() {
    this.addObstacles();
    this.runLogic();
  }

  addObstacles() {
    this.obstacles.push(
      new Obstacle(this, 100, 100, 400, 50),
      new Obstacle(this, 150, -350, 50, 850),
      new Obstacle(this, -250, 150, 300, 50),
      new Obstacle(this, -150, 300, 400, 50)
    );
  }

  enableControls() {
    window.addEventListener('keydown', (event) => {
      const code = event.code;
      switch (code) {
      }
    });
  }

  runLogic() {
    window.requestAnimationFrame(() => {
      this.clean();
      this.draw();
      this.runLogic();
    });
  }

  draw() {
    //this.context.clearRect(0, 0, 500, 500);
    this.player.runLogic();
    
    for (const obstacle of this.obstacles) {
      obstacle.draw();
    }
  }

  clean() {
    this.context.clearRect(0, 0, 650, 450);
  }
}

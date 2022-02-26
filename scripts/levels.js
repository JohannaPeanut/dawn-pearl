class Level {
  constructor(obstacles, balls) {
    this.obstacles = obstacles;
    this.balls = balls;
  }
}

const level1 = new Level(
  [
    { x: 200, y: -2, height: 200 },
    { x: 350, y: 100, height: 500 },
    { x: 50, y: 250, height: 500 },
    { x: 450, y: 150, height: 130 },
    { x: 150, y: 150, height: 130 },
    { x: 700, y: -2, height: 200 },
    { x: 700, y: 270, height: 200 }
  ],
  [{ x: 800, y: 200 }]
);

const level2 = new Level(
  [
    { x: 700, y: -2, height: 200 },
    { x: 350, y: 100, height: 500 }, 
    { x: 450, y: -2, height: 200 },
    { x: 750, y: 260, height: 200 },
    { x: 140, y: 0, height: 388 },
    { x: 180, y: 0, height: 388 },
     { x: 850, y: 150, height: 130 },
     { x: 900, y: 150, height: 130 },
     { x: 810, y: 150, height: 130 },
   { x: 550, y: 150, height: 330 },
    { x: 700, y: 0, height: 200 },
    { x: 700, y: 270, height: 200 } 
  ],
  [{ x: 1000, y: 50 }]
);

const level3 = new Level(
  [
    { x: 200, y: 0, height: 200 },
    { x: 350, y: 100, height: 500 },
    { x: 50, y: 250, height: 500 },
    { x: 450, y: 150, height: 130 },
    { x: 150, y: 150, height: 130 },
    { x: 700, y: 0, height: 200 },
    { x: 700, y: 270, height: 200 }
  ],
  [{ x: 800, y: 50 }]
);

const level4 = new Level(
  [
    { x: 200, y: 0, height: 200 },
    { x: 350, y: 100, height: 500 },
    { x: 50, y: 250, height: 500 },
    { x: 450, y: 150, height: 130 },
    { x: 150, y: 150, height: 130 },
    { x: 700, y: 0, height: 200 },
    { x: 700, y: 270, height: 200 }
  ],
  [{ x: 800, y: 50 }]
);

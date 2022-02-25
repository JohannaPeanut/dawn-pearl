class Level {
  constructor(obstacles) {
    this.obstacles = obstacles;
  }
}

const level1 = new Level([
  { x: 200, y: -2, height: 200 },
  { x: 350, y: 100, height: 500 },
  { x: 50, y: 250, height: 500 },
  { x: 450, y: 150, height: 130 },
  { x: 150, y: 150, height: 130 },
  { x: 700, y: -2, height: 200 },
  { x: 700, y: 270, height: 200 }
]);

const level2 = new Level([
  { x: 200, y: -2, height: 200 },
  { x: 350, y: 100, height: 500 }
  /*  { x: 50, y: 250, height: 500 },
    { x: 450, y: 150, height: 130 },
    { x: 150, y: 150, height: 130 },
    { x: 700, y: 0, height: 200 },
    { x: 700, y: 270, height: 200 } */
]);

const level3 = new Level([
  { x: 200, y: 0, height: 200 },
  { x: 350, y: 100, height: 500 },
  { x: 50, y: 250, height: 500 },
  { x: 450, y: 150, height: 130 },
  { x: 150, y: 150, height: 130 },
  { x: 700, y: 0, height: 200 },
  { x: 700, y: 270, height: 200 }
]);

const level4 = new Level([
  { x: 200, y: 0, height: 200 },
  { x: 350, y: 100, height: 500 },
  { x: 50, y: 250, height: 500 },
  { x: 450, y: 150, height: 130 },
  { x: 150, y: 150, height: 130 },
  { x: 700, y: 0, height: 200 },
  { x: 700, y: 270, height: 200 }
]);

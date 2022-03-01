class Level {
  constructor(obstacles, balls, goals) {
    this.obstacles = obstacles;
    this.balls = balls;
    this.goals = goals;
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
  [
    { x: 1000, y: 50, color: 'blue' }
  ],
  [
    { x: 70, y: 70 },
  ]
);

const level2 = new Level(
  [
    { x: 700, y: -2, height: 200 },
    { x: 350, y: 100, height: 500 },
    { x: 450, y: -2, height: 200 },

    { x: 140, y: 0, height: 388 },
    { x: 180, y: 0, height: 388 },
    /* { x: 850, y: 150, height: 130 },
    { x: 900, y: 150, height: 130 },
    { x: 810, y: 150, height: 130 }, */

    { x: 550, y: 150, height: 330 },
    { x: 700, y: 0, height: 200 },
    { x: 700, y: 270, height: 200 }
  ],
  [
    { x: 850, y: 100, color: 'red' },
    { x: 800, y: 200, color: 'yellow' },
    { x: 1000, y: 50, color: 'blue' }
  ],
  [
    { x: 70, y: 70 },
    { x: 70, y: 140 }
  ]
);

const level4 = new Level(
  [
    { x: 200, y: 0, height: 200, move: true },
    { x: 350, y: 100, height: 500, move: true },
    { x: 400, y: 250, height: 500, move: true },
    { x: 450, y: 150, height: 130, move: true },
    { x: 150, y: 150, height: 130, move: true },
    { x: 700, y: 0, height: 200, move: true },
    { x: 700, y: 270, height: 200, move: true }
  ],
  [
    { x: 350, y: 200, color: 'red' },
    { x: 1000, y: 50, color: 'blue' }
  ],
  [
    { x: 70, y: 70 },
    { x: 70, y: 140 }
  ]
);

const level3 = new Level(
  [
    //{ x: 440, y: 0, height: 388 },
    { x: 580, y: 30, height: 388, move: true },

    { x: 200, y: 0, height: 200, move: true },
    { x: 350, y: 100, height: 500 },
    { x: 850, y: 250, height: 500 },
    { x: 50, y: 150, height: 130 },
    { x: 150, y: 150, height: 130 },
    { x: 700, y: 0, height: 200, move: true },
    { x: 700, y: 270, height: 200, move: true }
  ],
  [{ x: 950, y: 50, color: 'yellow' }],
  [
    { x: 70, y: 70 }
  ]
);

const level5 = new Level(
  [],
  [{ x: 950, y: 50, color: 'yellow' },
    { x: 350, y: 200, color: 'red' },
    { x: 1000, y: 50, color: 'blue' },
    { x: 710, y: 400, color: 'red' },
    { x: 1000, y: 300, color: 'blue' },
    { x: 1000, y:10, color: 'white' }
]
  [
    { x: 70, y: 70 },
    { x: 70, y: 70 },
  { x: 70, y: 70 },
  { x: 70, y: 70 },
    { x: 70, y: 70 },
  { x: 70, y: 70 }
  ]
);


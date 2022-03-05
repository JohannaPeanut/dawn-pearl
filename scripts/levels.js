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
    { x: 850, y: -2, height: 200 },
    { x: 850, y: 270, height: 200 },
    { x: 750, y: -2, height: 350 },
    { x: 750, y: 420, height: 200 }
  ],
  [{ x: 1000, y: 50 }],
  [{ x: 70, y: 70 }]
);

const level2 = new Level(
  [
    { x: 350, y: 100, height: 500 },
    { x: 480, y: -2, height: 270, move: true },
    { x: 450, y: -2, height: 270, move: true },

    { x: 140, y: 0, height: 388 },
    { x: 180, y: 0, height: 388 },
    { x: 550, y: 0, height: 330 },
    { x: 720, y: 0, height: 200 },
    { x: 720, y: 270, height: 220 },
    { x: 800, y: 230, height: 130 },
    { x: 880, y: 0, height: 100 }
  ],
  [
    { x: 600, y: 200 },
    { x: 1000, y: 50 }
  ],
  [
    { x: 70, y: 140 },
    { x: 250, y: 70 }
  ]
);

const level3 = new Level(
  [
    { x: 350, y: 100, height: 50, move: true  },
    { x: 350, y: 160, height: 50, move: true  },
    { x: 350, y: 220, height: 50, move: true  },
    { x: 350, y: 280, height: 50, move: true  },
    { x: 450, y: -2, height: 200},

    { x: 130, y: 70, height: 308 },
    
    { x: 650, y: 150, height: 130 },
    { x: 600, y: 150, height: 130 },
    { x: 710, y: 150, height: 130 },

    { x: 550, y: 90, height: 280 },
    { x: 750, y: 60, height: 400 }
  ],
  [
    { x: 850, y: 100 },
    { x: 800, y: 200 },
    { x: 1000, y: 50 }
  ],
  [
    { x: 260, y: 50 },
    { x: 70, y: 240 },
    { x: 630, y: 340 }
  ]
);

const level4 = new Level(
  [
    //{ x: 440, y: 0, height: 388 },
    { x: 580, y: 30, height: 388, move: true },

    { x: 200, y: 0, height: 200, move: true },
    { x: 200, y: 260, height: 200, move: true },
    { x: 350, y: 100, height: 500 },
    { x: 450, y: 100, height: 500 },
    { x: 950, y: 250, height: 500 },
    { x: 850, y: -2, height: 380 },
    { x: 50, y: 150, height: 100 },
    { x: 150, y: 190, height: 100 },
    { x: 80, y: 150, height: 100 },
    { x: 250, y: 110, height: 100 },
    { x: 700, y: 0, height: 200, move: true },
    { x: 700, y: 270, height: 200, move: true }
  ],
  [{ x: 950, y: 50 }, 
    { x: 260, y: 150 },
    { x: 70, y: 240 },
    { x: 630, y: 340 }],
  [{ x: 70, y: 70 },
    { x: 410, y: 340 },
    { x: 800, y: 140 },
    { x: 140, y: 100 }]
);

const level5 = new Level(
  [
    { x: 190, y: 100, height: 50, move: true  },
    { x: 190, y: 160, height: 50, move: true  },
    { x: 190, y: 220, height: 50, move: true  },
    { x: 190, y: 280, height: 50, move: true  },
    { x: 190, y: 340, height: 50, move: true  },
    { x: 900, y: 0, height: 200, move: true },
    { x: 350, y: 100, height: 500, move: true },
    { x: 400, y: 250, height: 500, move: true },
    { x: 450, y: 150, height: 130, move: true },
    { x: 120, y: 150, height: 130, move: true },
    { x: 700, y: 0, height: 200, move: true },
    { x: 700, y: 270, height: 200, move: true }
  ],
  [
    
    { x: 950, y: 50 }, 
    { x: 260, y: 250 },
    { x: 70, y: 240 },
    { x: 950, y: 200 },
    { x: 1000, y: 50 }
  ],
  [
    { x: 70, y: 70 },
    { x: 70, y: 140 },
    { x: 270, y: 70 },
    { x: 270, y: 140 },
    { x: 270, y: 210 },
  ]
);

const level6 = new Level(
  [],
  [
    { x: 950, y: 150 },
    { x: 350, y: 200 },
    { x: 1000, y: 130 },
    { x: 710, y: 400 },
    { x: 1000, y: 300 },
    { x: 1000, y: 110 },
    { x: 1000, y: 150 },
    { x: 10, y: 70 },
    { x: 900, y: 180 },
    { x: 10, y: 300 }
  ],
  [
    { x: 70, y: 70 },
    { x: 170, y: 70 },
    { x: 270, y: 70 },
    { x: 370, y: 70 },
    { x: 470, y: 70 },
    { x: 570, y: 70 },
    { x: 670, y: 70 },
    { x: 770, y: 70 },
    { x: 870, y: 70 },
    { x: 970, y: 70 }
  ]
);

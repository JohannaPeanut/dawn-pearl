const startScreenElement = document.getElementById('start-screen');
const playingScreenElement = document.getElementById('playing-screen');
const endScreenElement = document.getElementById('game-over-screen');
const wonScreenElement = document.getElementById('won-screen');

const startButton = startScreenElement.querySelector('button');
const tryAgainButton = endScreenElement.querySelector('button');

const screenElements = {
  start: startScreenElement,
  playing: playingScreenElement,
  end: endScreenElement
};

let levelNo = 1;

const game = new Game(canvasElement, screenElements, levelNo);


startButton.addEventListener('click', () => {
  game.start();
});

tryAgainButton.addEventListener('click', () => {
  levelNo = 1;
  game.start();
});


function startNextLevel(levelNo) {

//let levelName = `gameLevel${levelNo}`

  switch (levelNo) {
    case 2:
      const gameLevel2 = new Game(canvasElement, screenElements, levelNo);
      gameLevel2.start(); // problem: can you code a flexible var name? without if/switch?
      break;
    case 3:
      const gameLevel3 = new Game(canvasElement, screenElements, levelNo);
      gameLevel3.start(); // problem: can you code a flexible var name? without if/switch?
      break;
    case 4:
      const gameLevel4 = new Game(canvasElement, screenElements, levelNo);
      gameLevel4.start(); // problem: can you code a flexible var name? without if/switch?
      break;
    default:
      playingScreenElement.style.display = 'none';
      wonScreenElement.style.display = '';
  }
}


const startScreenElement = document.getElementById('start-screen');
const playingScreenElement = document.getElementById('playing-screen');
const endScreenElement = document.getElementById('game-over-screen');
const wonScreenElement = document.getElementById('won-screen');
const helpDivElement = document.querySelector('.help');

const startButton = startScreenElement.querySelector('button');
const tryAgainButton = endScreenElement.querySelector('button');
const helpButton = document.querySelector('.help-button');

const screenElements = {
  start: startScreenElement,
  playing: playingScreenElement,
  end: endScreenElement
};

const ballImage = new Image();
ballImage.src = 'images/Metal-Ball-Transparent.png';

const holeImage = new Image();
holeImage.src = 'images/hole.png';

const holeHitImage = new Image();
holeHitImage.src = 'images/hole_hit.png';

const smokeImage = new Image();
smokeImage.src = 'images/smoke.png';

let levelNo = 1;

const game = new Game(canvasElement, screenElements, levelNo);

startButton.addEventListener('click', () => {
  game.start();
});

tryAgainButton.addEventListener('click', () => {
  levelNo = 1;
  game.start();
});

helpButton.addEventListener('click', () => {
  helpDivElement.style.display = '';
});

helpDivElement.addEventListener('click', () => {
  helpDivElement.style.display = 'none';
});

/* const gameLevel3 = new Game(canvasElement, screenElements, 6);
gameLevel3.start(); */

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
    case 5:
      const gameLevel5 = new Game(canvasElement, screenElements, levelNo);
      gameLevel5.start(); // problem: can you code a flexible var name? without if/switch?
      break;
    case 6:
      const gameLevel6 = new Game(canvasElement, screenElements, levelNo);
      gameLevel6.start(); // problem: can you code a flexible var name? without if/switch?
      break;
    default:
      playingScreenElement.style.display = 'none';
      wonScreenElement.style.display = '';
  }
}

const canvasElement = document.querySelector('canvas');

const game = new Game(canvasElement);

game.start();

game.context.fillRect(50, 50, 50, 50);

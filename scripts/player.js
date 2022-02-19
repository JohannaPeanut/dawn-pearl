class Player {
  constructor(gameInstance) {
    this.game = gameInstance;
    this.x = 600;
    this.y = 100;
    //this.y = 400;
    this.radius = 20;
    this.speed = 60;

    //this.frame = 1;
  }

  //make player constantly "fall" until she hits the bottom
  runLogic() {
    
      //instead of setIntervall to make movement smoother
      if (this.y <= 450 - this.radius) {
        this.y += this.speed / 60;
        //speed += acceleration / fps;
        //this.x += speed / fps;
        //this.clean();
      }
      this.draw();
  }


  draw() {
    this.game.context.fillStyle = 'blue';
    this.game.context.beginPath();
    game.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.game.context.closePath();
    this.game.context.fill();
    //this.frame++;
    //this.game.context.save();
    //this.game.context.restore();
  }
}

class mousePlayer {
  constructor(gameInstance) {
    this.game = gameInstance;
    this.x = 0;
    this.y = 0;
    this.isDown = false;
    this.isDraggingBall = false;
  }
  draw() {}

  runLogic() {
    
    //problem: weird ball behavior when mouse is clickd and out of canvas
    if (this.isDown) {
      this.y = clamp(this.y, 0, this.game.canvas.height);
    this.x = clamp(this.x,0, this.game.canvas.width);
      for (let ball of this.game.balls) {
       
        if (this.checkCollisionWithBall(ball)) {
          if (!this.isDraggingBall) {
            console.log('collision');
            this.isDraggingBall = true;
            this.draggedBall = ball;
          }
        }
      }
    } else {
      this.isDraggingBall = false;
      this.draggedBall = '';
    }
  }

  checkCollisionWithBall(element) {
    // check if mouse is clicked inside the radius of the ball
    return (
      element.x + element.radius > this.x &&
      element.x - element.radius < this.x &&
      element.y + element.radius > this.y &&
      element.y - element.radius < this.y
    );
  }
}
/* checkCollision(element) {
  // check for intersections between player and ball
  return (
    // is right edge of element in front of left edge of ball
    element.x + element.radius > this.x - this.radius &&
    // is left edge of element before of right edge of ball
    element.x - element.radius < this.x + this.radius &&
    // is bottom edge of element below top edge of ball
    element.y + element.radius > this.y - this.radius &&
    // is top edge of element above bottom edge of ball
    element.y - element.radius < this.y + this.radius
  );
} */
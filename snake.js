
/**
 * Constructor function to initialize the snake instance.
 */
function snake () {
 
  this.canvas = $("#canvas")[0];
  this.ctx = canvas.getContext("2d");
  this.canvasWidth = $("#canvas").width();
  this.canvasHeight = $("#canvas").height();

  //cell width 
  this.cellWidth = 20;
  this.food = {};
  this.score;
  
  //assumption is: an array of cell creates a snake
  this.snakePixels; 
};

/* This function will 
 * determine initial length of the snake
 * create a horizontal snake starting from the top left
 */
 snake.prototype.createSnake = function () { 
  var length = 1; 
  this.snakePixels = []; //Empty array to start with
  for(var i = length-1; i>=0; i--) {
    this.snakePixels.push({x: i, y:0});
  }
};

/**
 * This method will render the snake.
 *
 * @param snake instance
 */ 
snake.prototype.renderSnake = function(self) {
    self.ctx.fillStyle = "#E6E6E6";
    self.ctx.fillRect(0, 0, self.canvasWidth, self.canvasHeight);
    self.ctx.strokeStyle = "black";
    self.ctx.strokeRect(0, 0, self.canvasWidth, self.canvasHeight);

    //The movement for the snake  - Pop out the tail cell and place it infront of the head cell
    var cellX = self.snakePixels[0].x;
    var cellY = self.snakePixels[0].y;
    
    if(direction == "right") cellX++;
    else if(direction == "left") cellX--;
    else if(direction == "up") cellY--;
    else if(direction == "down") cellY++;
    

    if(cellX == -1 || cellX == self.canvasWidth/self.cellWidth || cellY == -1 || 
            cellY == self.canvasHeight/self.cellWidth || self.detectCollision(cellX, cellY, self.snakePixels)) {

      clearInterval(window.intervalID);
      self.ctx.font='40px san-serif';
      self.ctx.fillStyle='red';
      self.ctx.fillText('Game Over !',180,200);
      self.ctx.font = '20px san-serif';
      self.ctx.fillStyle='#000000';
      self.ctx.fillText('To Play again Refresh the page or click the Restarts button',50,300);
      $("#scoreContainer").removeClass("hide");
      $("#scoreboard").html(self.score);  
      return;
    }
     
    // If food eaten than dont pos the tail and add 5 extra cell to snake else pop one cell from tail and append to head.
    if(cellX == self.food.x && cellY == self.food.y) {
      var tail ={x: cellX, y: cellY};

      self.score+=10;
      //Create new food
      self.createFood();
      self.snakePixels.unshift(tail);
 
    } else {
      var tail = self.snakePixels.pop();
      tail.x = cellX; tail.y = cellY;
      self.snakePixels.unshift(tail);
    }
    
    for(var i = 0; i < self.snakePixels.length; i++) {
      var c = self.snakePixels[i];
      self.paintXY(c.x, c.y, "#084B8A");
    }
    
    //paint the food
    self.paintXY(self.food.x, self.food.y, "red");
    //paint the score
    var scoreText = "Score: " + self.score;
    self.ctx.fillStyle='green';
    self.ctx.fillText(scoreText, self.canvasWidth-50, 20);

};

/*
 *  This will create a cell with x/y between 0-29(600/20)
 z*  
 */
snake.prototype.createFood = function() {
  this.food = {
    x: Math.round(Math.random()*(this.canvasWidth-this.cellWidth)/this.cellWidth), 
    y: Math.round(Math.random()*(this.canvasHeight-this.cellWidth)/this.cellWidth), 
  };
};


/*
* This function will check if the passed x/y coordinates exist in array of cells or not
*
*/

snake.prototype.detectCollision = function(x, y, array) {
    for(var i = 0; i < array.length; i++) {
      if(array[i].x == x && array[i].y == y)
       return true;
    }
    return false;
};

//function to paint cells at xy 
snake.prototype.paintXY = function (x, y, fillColor) {
  this.ctx.fillStyle = fillColor;
  this.ctx.fillRect(x*this.cellWidth, y*this.cellWidth, this.cellWidth, this.cellWidth);
  this.ctx.strokeStyle = "black";
  this.ctx.strokeRect(x*this.cellWidth, y*this.cellWidth, this.cellWidth, this.cellWidth);
};

snake.prototype.init = function() {
  var self = this;
  this.score = 0;
  direction = "right";
  this.createSnake();
  this.createFood();
  
  if(typeof window.intervalID != "undefined") {
    clearInterval(window.intervalID);
  } 
  window.intervalID = setInterval(
     (function(self) {         //Self-executing func which takes 'this' as self
         return function() {   //Return a function in the context of 'self'
             self.renderSnake(self); 
         }
     })(this),120);
};

snake.prototype.fullScreen = function () {
  if(this.canvas.requestFullscreen) {
    this.canvas.requestFullscreen();
  } else if(this.canvas.mozRequestFullScreen) {
    this.canvas.mozRequestFullScreen();
  } else if(this.canvas.webkitRequestFullscreen) {
    this.canvas.webkitRequestFullscreen();
  } else if(this.canvas.msRequestFullscreen) {
    this.canvas.msRequestFullscreen();
  }
};

snake.prototype.setOffsetForFullScreen = function () {
    if (document.fullscreenElement || document.webkitFullscreenElement || 
            document.mozFullScreenElement || document.msFullscreenElement ) {
        this.canvas.width=window.innerWidth;
        this.canvas.height=window.innerHeight;
        this.canvasWidth = $("#canvas").width();
        this.canvasHeight = $("#canvas").height();
        $("#controls").style.display='none';
    } else {
        this.canvas.width=600;
        this.canvas.height=600;
        this.canvasWidth = $("#canvas").width();
        this.canvasHeight = $("#canvas").height();
        $("#controls").style.display='inline';
    }
};

snake.prototype.restart =  function (){
  location.reload();
};









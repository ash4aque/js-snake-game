//Using module pattern for keeping global space clean and maintain modular code.
var app = (function() {

  var direction = "right";
  
  return {
    /**
     * Initialize the app
     */
    init: function () {
      
      var mySnake = new snake();
      mySnake.init();

      $("#fullscreen").click(function(){
        mySnake.fullScreen();
      });

      $("#restart").click(function(){
        mySnake.restart();
      });

      document.addEventListener("fullscreenchange", function(){mySnake.setOffsetForFullScreen();});
      document.addEventListener("webkitfullscreenchange", function(){mySnake.setOffsetForFullScreen();});
      document.addEventListener("mozfullscreenchange", function(){mySnake.setOffsetForFullScreen();});
      document.addEventListener("MSFullscreenChange", function(){mySnake.setOffsetForFullScreen();});
    }
  };
}());


$(document).ready(function(){
  app.init();
  $(document).keydown(function(e){
    var key = e.which;
    if(key == "37" && direction != "right") {
      direction = "left";
    } else if(key == "38" && direction != "down") {
      direction = "up";
    } else if(key == "39" && this.direction != "left") {
      direction = "right";
    } else if(key == "40" && direction != "up") {
      direction = "down";
    }
  });

});
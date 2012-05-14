(function() {

  Crafty.c("MultiwayAnim", {
    init: function() {
      this.bind("NewDirection", function(direction) {
        if (direction.x < 0) {
          if (!this.isPlaying("walk_left")) {
            this.stop().animate("walk_left", 10, -1);
          }
        }
        if (direction.x > 0) {
          if (!this.isPlaying("walk_right")) {
            this.stop().animate("walk_right", 10, -1);
          }
        }
        if (direction.y < 0) {
          if (!this.isPlaying("walk_up")) {
            this.stop().animate("walk_up", 10, -1);
          }
        }
        if (direction.y > 0) {
          if (!this.isPlaying("walk_down")) {
            this.stop().animate("walk_down", 10, -1);
          }
        }
        if (!direction.x && !direction.y) {
          return this.stop();
        }
      });
      return this;
    }
  });

  Crafty.c("LeftControls", {
    init: function() {
      return this.requires("Multiway");
    },
    leftControls: function(speed) {
      this.multiway(speed, {
        W: -90,
        S: 90,
        D: 0,
        A: 180
      });
      return this;
    }
  });

}).call(this);
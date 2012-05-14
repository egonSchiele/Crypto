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

  Crafty.c("HitSolids", {
    init: function() {
      return this.bind("Moved", function(from) {
        if (this.hit("solid")) {
          return this.attr({
            x: from.x,
            y: from.y
          });
        }
      });
    }
  });

  Crafty.c("RightControls", {
    init: function() {
      return this.requires("Multiway");
    },
    rightControls: function(speed) {
      this.multiway(speed, {
        UP_ARROW: -90,
        DOWN_ARROW: 90,
        RIGHT_ARROW: 0,
        LEFT_ARROW: 180
      });
      return this;
    }
  });

}).call(this);
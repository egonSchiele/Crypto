(function() {

  window.onload = function() {
    var HEIGHT, TILESIZE, WIDTH, generateWorld, isEdgeTile, rand;
    rand = Crafty.math.randomInt;
    TILESIZE = 16;
    WIDTH = 20;
    HEIGHT = 16;
    Crafty.init(WIDTH * TILESIZE, HEIGHT * TILESIZE);
    Crafty.canvas.init();
    Crafty.scene("main", function() {
      return generateWorld();
    });
    Crafty.sprite(TILESIZE, "img/sprites.png", {
      grass1: [0, 0],
      grass2: [1, 0],
      grass3: [2, 0],
      grass4: [3, 0],
      flower: [0, 1],
      bush1: [0, 2],
      bush2: [1, 2],
      player: [0, 3]
    });
    generateWorld = function() {
      var f, grassType, i, j, player1, _i, _j;
      for (i = _i = 0; 0 <= WIDTH ? _i <= WIDTH : _i >= WIDTH; i = 0 <= WIDTH ? ++_i : --_i) {
        for (j = _j = 0; 0 <= HEIGHT ? _j <= HEIGHT : _j >= HEIGHT; j = 0 <= HEIGHT ? ++_j : --_j) {
          grassType = rand(1, 4);
          Crafty.e("2D, Canvas, grass" + grassType).attr({
            x: i * TILESIZE,
            y: j * TILESIZE,
            z: 1
          });
          if (isEdgeTile(i, j)) {
            Crafty.e("2D, Canvas, solid, bush" + rand(1, 2)).attr({
              x: i * TILESIZE,
              y: j * TILESIZE,
              z: 2
            });
          } else if (rand(0, 5) > 3) {
            f = Crafty.e("2D, Canvas, flower, solid, SpriteAnimation, explodable").attr({
              x: i * TILESIZE,
              y: j * TILESIZE,
              z: 1000
            }).bind('explode', function() {
              return this.destroy();
            });
          }
        }
      }
      Crafty.c("Hero", {
        Hero: function() {
          this.requires("SpriteAnimation, Collision, Animate, MultiwayAnim").animate("walk_left", 6, 3, 8).animate("walk_right", 9, 3, 11).animate("walk_up", 3, 3, 5).animate("walk_down", 0, 3, 2);
          return this;
        }
      });
      return player1 = Crafty.e("2D, Canvas, Hero, player, BombDropper, LeftControls").attr({
        x: 16,
        y: 32,
        z: 1000
      }).leftControls(1).Hero();
    };
    isEdgeTile = function(x, y) {
      return x === 0 || x === (WIDTH - 1) || y === 0 || y === (HEIGHT - 1);
    };
    return Crafty.scene("main");
  };

}).call(this);
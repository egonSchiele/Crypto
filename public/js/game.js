(function() {

  window.onload = function() {
    Crafty.init(600, 300);
    Crafty.background('rgb(127,127,127)');
    Crafty.e("Paddle, 2D, DOM, Color, Multiway").color('rgb(255,0,0)').attr({
      x: 20,
      y: 100,
      w: 10,
      h: 100
    }).multiway(4, {
      W: -90,
      S: 90
    });
    Crafty.e("Paddle, 2D, DOM, Color, Multiway").color('rgb(0,255,0)').attr({
      x: 580,
      y: 100,
      w: 10,
      h: 100
    }).multiway(4, {
      UP_ARROW: -90,
      DOWN_ARROW: 90
    });
    Crafty.e("2D, DOM, Color, Collision").color('rgb(0,0,255)').attr({
      x: 300,
      y: 150,
      w: 10,
      h: 10,
      dX: Crafty.math.randomInt(2, 5),
      dY: Crafty.math.randomInt(2, 5)
    }).bind('EnterFrame', function() {
      if (this.y <= 0 || this.y >= 290) {
        this.dY *= -1;
      }
      if (this.x > 600) {
        this.x = 300;
        Crafty("LeftPoints").each(function() {
          return this.text(++this.points + " Points");
        });
      }
      if (this.x < 10) {
        this.x = 300;
        Crafty("RightPoints").each(function() {
          return this.text(++this.points + " Points");
        });
      }
      this.x += this.dX;
      return this.y += this.dY;
    }).onHit('Paddle', function() {
      return this.dX *= -1;
    });
    Crafty.e("LeftPoints, DOM, 2D, Text").attr({
      x: 20,
      y: 20,
      w: 100,
      h: 20,
      points: 0
    }).text("0 Points");
    return Crafty.e("RightPoints, DOM, 2D, Text").attr({
      x: 515,
      y: 20,
      w: 100,
      h: 20,
      points: 0
    }).text("0 Points");
  };

}).call(this);
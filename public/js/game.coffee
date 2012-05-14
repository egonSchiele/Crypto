window.onload = ->
  rand = Crafty.math.randomInt
  TILESIZE = 16
  WIDTH = 20
  HEIGHT = 16
  Crafty.init WIDTH * TILESIZE, HEIGHT * TILESIZE
  Crafty.canvas.init();
  
  Crafty.scene "main", -> generateWorld()
  Crafty.sprite TILESIZE, "img/sprites.png", {
        grass1: [0,0],
        grass2: [1,0],
        grass3: [2,0],
        grass4: [3,0],
        flower: [0,1],
        bush1: [0,2],
        bush2: [1,2],
        player: [0,3]    
    }

  generateWorld = -> 
    # loop through all tiles
    for i in [0..WIDTH]
      for j in [0..HEIGHT]
        # place grass on all tiles
        grassType = rand(1, 4)
        Crafty.e("2D, Canvas, grass" + grassType).attr(x: i * TILESIZE, y: j * TILESIZE, z: 1)

        # bushes on the edges
        if isEdgeTile(i, j)
          Crafty.e("2D, Canvas, solid, bush" + rand(1, 2)).attr(x: i * TILESIZE, y: j * TILESIZE, z: 2)
        else if rand(0, 5) > 3
          # flowers
          f = Crafty.e("2D, Canvas, flower, solid, SpriteAnimation, explodable")
                  .attr(x: i * TILESIZE, y: j * TILESIZE, z: 1000)
                  .bind('explode', -> @destroy())
 
    Crafty.c "LeftControls", {
      init: ->
        @requires("Multiway") 
      leftControls: (speed) ->
        @multiway(speed, {W: -90, S: 90, D: 0, A: 180})
        @
    }

    Crafty.c "MultiwayAnim", {
      init: ->
        @bind("NewDirection", (direction) ->
              if direction.x < 0
                unless @isPlaying("walk_left")
                  @stop().animate("walk_left", 10, -1)
              if direction.x > 0
                unless @isPlaying("walk_right")
                  @stop().animate("walk_right", 10, -1)
              if direction.y < 0
                unless @isPlaying("walk_up")
                  @stop().animate("walk_up", 10, -1)
              if direction.y > 0
                unless @isPlaying("walk_down")
                  @stop().animate("walk_down", 10, -1)
              if not direction.x and not direction.y
                  @stop()
            )
        this
    }

    Crafty.c "Hero", {
      Hero: ->
        @requires("SpriteAnimation, Collision, Animate, MultiwayAnim")
          .animate("walk_left", 6, 3, 8)
          .animate("walk_right", 9, 3, 11)
          .animate("walk_up", 3, 3, 5)
          .animate("walk_down", 0, 3, 2)
          this
    }


    player1 = Crafty.e("2D, Canvas, Hero, player, BombDropper, LeftControls")
        .attr(x: 16, y: 32, z: 1000)
        .leftControls(1)
        .Hero()

  isEdgeTile = (x, y) -> x is 0 or x is (WIDTH - 1) or y is 0 or y is (HEIGHT - 1)

  Crafty.scene("main")

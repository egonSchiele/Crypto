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

Crafty.c "LeftControls", {
  init: ->
    @requires("Multiway") 
  leftControls: (speed) ->
    @multiway(speed, {W: -90, S: 90, D: 0, A: 180})
    @
}


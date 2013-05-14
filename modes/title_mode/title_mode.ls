
global.title_mode = mixin ->
	#global.title = @loadImage "sprites/title.png"
	global.mode = @
	key.press key_down,	 ~> @option = "password" if global.mode == @
	key.press key_up,	 ~> @option = "gamestart" if global.mode == @
	key.press key_start, ~> stage_select_mode! if global.mode == @
	draw: (screen) ~>
		screen.background 0 0 0
		screen.image sprite("modes/title_mode/sprites/background.png"), camera.width/2 - title.width/2, 0

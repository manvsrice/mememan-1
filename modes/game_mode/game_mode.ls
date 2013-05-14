global.game_mode = mixin ->
	global.mode = @

	stage.create!

	key.press key_start, ~> 
		return if mode != @
		play "pause"
		@paused = !@paused

	paused: false

	draw: (screen) ~>
		if @paused then
			screen.fill 107, 8, 0
			screen.rect 0, camera.height * 3/4, camera.width, camera.height*1/4
			return

		screen.background 222 222 222
		bg = stage.background!
		for i from -4 to 4
			for j from -4 to 4
				screen.image bg, 
					bg.width * i - hero.pos.x % bg.width, 
					bg.height * j

		visible_objects = camera.visible_objects!

		dt = min((now! - global.last_tick),0.03)
		camera.tick dt
		for obj in visible_objects
			obj.tick dt if obj.dynamic
		global.last_tick := now!


		dynamic_objects = []
		for obj in visible_objects
			if !obj.dynamic then
				obj.draw screen
			else
				dynamic_objects.push obj
		for obj in dynamic_objects
			obj.draw screen

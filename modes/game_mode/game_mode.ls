global.game_mode = mixin ->
	global.mode = @

	stage.create!

	global.draw_healthbar = (screen,bars,max,x,y,dir = "down") ~>
		dir = "right"

		switch (dir)
		| \down 	=> bar_w = 6; bar_h = 1; w = bar_w+2; h = bar_h*max*2+1; sx = x+1; sy = y+h - 2; addx = 0; addy = -2;
		| \right 	=> bar_w = 1; bar_h = 6; w = bar_w*max*2+1; h = bar_h+2; sx = x + 1; sy = y+1; addx = 2; addy = 0;

		screen.fill(0,0,0)
		screen.rect x, y, w, h

		screen.fill(255,255,0)
		for i from 0 til bars
			screen.rect sx+i*addx, sy+i*addy, bar_w, bar_h
	
	key.press key_down, ~> if mode == @
		@move_cursor 1 if @paused

	key.press key_a, ~> if mode == @
		if @paused then
			play "pause"
			@paused = false
		else
			if (key.down key_down) then
				hero.slide!
			else
				hero.jump!

	refresh_pad = ->
		hero.pad = 
			x: (if key.down key_right then 1 else 0) + (if key.down key_left then -1 else 0)
			y: (if key.down key_down then 1 else 0) + (if key.down key_up then -1 else 0)
	each (~>
		key.press it, ~> defer refresh_pad if mode == @
		key.release it, ~> defer refresh_pad if mode == @),
		[key_right, key_left, key_down, key_up]
	
	key.release key_a, ~> if mode == @
		hero.stop_jump!

	key.press key_b, ~> if mode == @
		hero.fire_weapon!

	key.press key_up, ~> if mode == @
		@move_cursor -1 if @paused

	key.press key_start, ~> if mode == @
		play "pause"
		@paused = !@paused

	cursor: 0
	move_cursor: ~> @cursor = (@cursor + it) %% hero.weapons.length if @paused 
	paused: false
	draw: (screen) ~>
		if @paused then
			screen.fill 107, 8, 0

			[x,y,X,Y] = [0,camera.height*3/4, camera.width, camera.height]
			screen.rect 0, camera.height * 3/4, camera.width, camera.height*1/4

			screen.fill 255, 255, 255
			screen.textFont courier_new
			screen.textSize 8
			screen.text "Paused!", x + 10, y + 10
			screen.text "Lives: " + hero.lives, X - 44, y+10
			screen.text "Stuff: " + 0, X - 44, y+20

			for i from 0 til hero.weapons.length
				log i
				wpn = hero.weapons[i]
				wpn_x = x + 10 + 80 * floor(i / 3)
				wpn_y = y + 20 + 14 * (i % 3)
				if @cursor!=i or blink(0.5s) then
					draw_healthbar screen, wpn.charge ? hero.hp, 28, wpn_x + 12, wpn_y, "right"
					screen.fill 255, 255, 255
					screen.text wpn.tag, wpn_x , wpn_y + 7
				if @cursor==i then
					hero.weapon = wpn
			return

		screen.background 222 222 222
		bg = stage.background!
		for i from -1 to 3
			for j from -1 to 3
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

		draw_healthbar screen, hero.hp, 28, 8, 8, "down"

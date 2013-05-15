require! {quadtree}
global.game_mode = mixin ->
	global.mode = @

	global.tree = quadtree {width:128,height:128}
	stage.create!

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
		key.press it, ~> defer refresh_pad if mode == @ and not @paused
		key.release it, ~> defer refresh_pad if mode == @ and not @paused),
		[key_right, key_left, key_down, key_up]
	
	key.release key_a, ~> if mode == @
		hero.stop_jump! if not @paused

	key.press key_b, ~> if mode == @
		hero.fire_weapon! if not @paused

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

			i = 0
			for wpn in hero.weapons when wpn.name in enabled_weapons
				wpn_x = x + 10 + 80 * floor(i / 3)
				wpn_y = y + 20 + 14 * (i % 3)
				if @cursor!=i or blink(0.5s) then
					draw_healthbar (wpn.charge ? hero.hp)/hero.maxhp, wpn_x + 12, wpn_y, "right"
					screen.fill 255, 255, 255
					screen.text wpn.tag, wpn_x , wpn_y + 7
				if @cursor==i then
					hero.weapon = wpn
				++i
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

		draw_healthbar hero.hp/hero.maxhp, 8, 8, "down"
		draw_healthbar hero.weapon.charge/hero.maxhp, 18, 8, "down", [0 0 255] if hero.weapon.charge?

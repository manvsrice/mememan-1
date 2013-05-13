require! {key}

global.mememan = mixin object, ->
	global.hero = @

	key.press key_a, ~> 
		return if @is_sliding!
		if @is_grounded! and (key.down \s) then
			@is_sliding = true_for 0.35s
		else
			@vel.y = -23*B if @is_grounded!
			@is_climbing = just false if @is_climbing!

	key.press key_b, ~>
		if @is_walking! or @is_jumping! or @is_climbing! or @is_shooting! then
			global.play "shoot"
			shot {dmg:2, side:@side, pos:v3(@pos.x+B*@dir,@pos.y,0), vel:v3(22*B*@dir,0,0)}
			@is_shooting = true_for 0.3s

	key.release key_a, ~> 
		@vel.y = 0 if @is_jumping!

	type: "mememan"
	sprite: "standing0"
	floats: false
	collides: true
	hp: 28
	depth: -1
	size: v3(16,25,0)
	vel: v3(0,0,0)
	climb: (dir) ~>
		@is_climbing = just true
		@just_climbed = true_for 0.4
		@ghost = @floats = true
		@vel.y = B * 4.5 * (if dir==\down then 1 else -1)
	draw: after @draw, (screen) ~>
		screen.fill(0,0,0)
		screen.rect 7, 8, 8, 57
		screen.fill(255,255,0)
		for y from 63 til (63-@hp*2) by -2
			screen.rect 8, y, 6, 1
	hurt: after @hurt, ~> 
		return if @is_immune!
		play "hurt"
		@vel.y += 3*B
		@just_hurt = true_for 0.5s
		@is_immune = true_for 1.2s
	tick: after @tick, (dt)  ~> 
		@vel.x = switch
		| @just_hurt! 		 => -@dir*2*B
		| @is_climbing! 	 => 0	
		| @is_sliding!		 => @dir*12*B
		| key.down key_right => B*4.4
		| key.down key_left	 => -B*4.4
		| _					 => 0

		@vel.y = switch
		| !@is_climbing!	 => @vel.y
		| @just_climbed!	 => @vel.y
		| key.down key_down	 => B*3
		| key.down key_up	 => -B*3
		| _ 				 => 0

		@dir = 1 if @vel.x > 0 and !@just_hurt!
		@dir = -1 if @vel.x < 0 and !@just_hurt!


		@ghost = @floats = @is_climbing!

		if @is_climbing! then
			stair = (filter (.is_stair), get_around(@pos.x,@pos.y))[0]
			@pos.x = stair.pos.x if stair?

		if @is_sliding! and !@has_solid_ahead! and @vel.y == 0 and @has_solid_over! then
				@ghost = @floats = true
				@dir = 1 if key.down \d
				@dir = -1 if key.down \a
				@is_sliding = true_for 0.04 

		if !@is_climbing! and !@is_sliding! then
			if key.down \s and has_stair(@pos.x, @pos.y + B) then
				@climb \down
			else if key.down \w and has_stair(@pos.x, @pos.y - B) then
				@climb \up
		else if @is_climbing! and !@just_climbed! and !has_stair(@pos.x,@pos.y + B/4) then
			@is_climbing = just false

		@sprite = 
			if @just_hurt! then
				"hurt"
			else if @is_climbing! then
				@dir = -1+floor((@pos.y/16)%2)*2
				if @is_almost_climbing! then
					"climbed"
				else
					"climbing"
			else if @is_sliding! then
				"sliding"
			else if @is_grounded! then
				if @is_stopped! then
					if @is_shooting! then
						"standing_shoot"
					else
						"standing" + cycle([0,0,0,0,0,0,0,0,0,1],4)
				else
					if @is_shooting! then
						"walking_shoot" + cycle([0,1,2,1],0.5)
					else
						"walking" + cycle([0,1,2,1],0.5)
			else
				if @is_shooting! then
					"jumping_shoot"
				else 
					"jumping"
	dir: 1
	side: "good"
	is_sliding: just false
	is_shooting: just false
	is_climbing: just false
	is_digging: just false
	just_hurt: just false
	just_climbed: just false
	is_almost_climbing: ~> @is_climbing! and !has_stair(@pos.x,@pos.y - B/4) and has_stair(@pos.x,@pos.y + B/4)
	is_jumping: ~>  @vel.y < 0 and !@is_climbing!
	is_walking: ~> !@is_jumping! and !@is_climbing! and !@is_shooting!
	is_stopped: ~> @vel.x == 0 and @vel.y == 0
	has_solid_ahead: ~>has_solid(@pos.x+@dir*B,@pos.y)
	has_solid_over: ~>not empty(filter (.solid), tree.get(@pos.x - @dir*B*1.1, @pos.y - B*1.5, @pos.x + @dir*B*1.1, @pos.y - B*0.5))

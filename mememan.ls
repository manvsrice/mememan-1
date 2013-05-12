require! {key}

global.cycle = (arr,interval) -> arr[floor((now!%interval)/interval*arr.length)]
global.mememan = mixin thing, ->
	global.hero = @

	key.press \j ~> 
		return if @is_sliding! or @is_digging!
		if @is_grounded! and (key.down \s) then
			@is_sliding = true_for 0.35s
		else
			@vel.y = -VI if @is_grounded!

	key.press \k ~>
		if @is_walking! or @is_jumping! then
			shot {} {pos:v3(@pos.x+B*@dir,@pos.y,0),vel:v3(22*B*@dir,0,0)}
			@is_shooting = true_for 0.3s

	key.release \j ~> 
		@vel.y = 0 if @is_jumping!

	sprite: "mememan/standing0"
	nome: "meme"
	is_sliding: just false
	is_shooting: just false
	is_climbing: just false
	is_digging: just false
	just_climbed: just false
	is_jumping: ~>  @vel.y < 0 and !@is_climbing!
	is_walking: ~> !@is_jumping! and !@is_climbing! and !@is_shooting!
	is_stopped: ~> @vel.x == 0 and @vel.y == 0
	floats: false
	collides: true
	hp: 28
	#pos: @pos ? v3(150,100,0)
	size: v3(16,25,0)
	vel: v3(0,0,0)
	#collide: ~>
		#if it.climbable then
			#if it.pos.y > @pos.y and key.down \s then
			#if key.down \s then
				#log "wow"
	climb: (dir) ~>
		@is_climbing = just true
		@just_climbed = true_for 0.4
		@ghost = @floats = true
		@pos.x = floor((@pos.x + B/2)/B)*B
		@vel.y = B * 4.5 * (if dir==\down then 1 else -1)
	draw: after @draw, (screen) ~>
		screen.fill(0,0,0)
		screen.rect 7, 8, 8, 57
		screen.fill(255,255,0)
		for y from 63 til (63-@hp*2) by -2
			screen.rect 8, y, 6, 1
	tick: after @tick, (dt)  ~> 
		@vel.x = switch
		| @is_climbing! => 0	
		| @is_sliding!	=> @dir*12*B
		| @is_digging!	=> @dir*12*B
		| key.down \d	=> B*4.4
		| key.down \a	=> -B*4.4
		| _				=> 0

		@vel.y = switch
		| !@is_climbing! => @vel.y
		| @just_climbed! => @vel.y
		| key.down \s	 => B*3
		| key.down \w 	 => -B*3
		| _ 			 => 0

		@dir = 1 if @vel.x > 0
		@dir = -1 if @vel.x < 0

		if @is_sliding! then
			if !has_solid(@pos.x + @dir*B, @pos.y) and has_solid(@pos.x + @dir*B, @pos.y - B)  then
				@is_digging = just true
				@is_sliding = just false
		if @is_digging! then
			if !has_solid(@pos.x, @pos.y - B) and has_solid(@pos.x - @dir*8, @pos.y - B)  then
				@is_digging = just false

			#if empty(filter (.solid), tree.get(@pos.x, @pos.y - B/2, @pos.x + @dir*B, @pos.y + B/2)) then
				#@is_sliding = true_for 0.1
			#else if @ghost and @has_solid(@pos.x, @pos.y - @dir*B/2) then
				#@ghost = @floats = false
				#@is_sliding = just false
				#@vel.y = 0
				#@pos.y = floor(@pos.y/B)*B+B/2
				#@vel.x = @dir*12*B
				#@pos.x += @dir*12*B*dt
				#@is_sliding = true_for 0.1

		@ghost = @floats = @is_climbing! or @is_digging!

		if !@is_climbing! and !@is_sliding! then
			if key.down \s and has_stair(@pos.x, @pos.y + B) then
				@climb \down
			else if key.down \w and has_stair(@pos.x, @pos.y - B) then
				@climb \up
		else if @is_climbing! and !@just_climbed! and !has_stair(@pos.x,@pos.y + B/4) then
			@is_climbing = just false

		@sprite = 
			if @is_climbing! then
				@dir = -1+floor((@pos.y/16)%2)*2
				if !has_stair(@pos.x,@pos.y - B/4) and has_stair(@pos.x,@pos.y + B/4) then
					"mememan/climbed"
				else
					"mememan/climbing"
			else if @is_sliding! or @is_digging! then
				"mememan/sliding"
			else if @is_grounded! then
				if @is_stopped! then
					if @is_shooting! then
						"mememan/standing_shoot"
					else
						"mememan/standing" + cycle([0,0,0,0,0,0,0,0,0,1],4)
				else
					if @is_shooting! then
						"mememan/walking_shoot" + cycle([0,1,2,1],0.5)
					else
						"mememan/walking" + cycle([0,1,2,1],0.5)
			else
				if @is_shooting! then
					"mememan/jumping_shoot"
				else 
					"mememan/jumping"

		@sprite += \_r if @dir == 1
		camera.pos = @pos.clone()
			#if @is_stopped! then
				#if @is_shooting! then 
					#"mememan/standing_shoot"
				#else
					#"mememan/standing" + 
			#else 
				#if @is_grounded! then
					#"mememan/walking" + cycle([0,1,2,1],0.5)
				#else
					#if @is_shooting! then
						#"mememan/jumping_shoot"
					#else 
						#"mememan/jumping"

		#@sprite = switch
		#| @vel.x == 0 and @vel.y == 0 => switch 
			#| time_since(@last_shot)<0.3 => "mememan/standing_shoot"
			#| _ => "mememan/standing" + cycle([0,0,0,0,0,0,0,0,0,1],5)
		#| _ => switch
			#| @grounded => "mememan/walking" + cycle([0,1,2,1],0.5)
			#| _ =>
				#switch
				#| time_since(@last_shot)<0.3 => "mememan/jumping_shoot"
				#| _ => "mememan/jumping"
				


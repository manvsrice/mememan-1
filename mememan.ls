require! {key}

global.cycle = (arr,interval) -> arr[floor((now!%interval)/interval*arr.length)]
	
global.mememan = mixin thing, ->
	key.press \j ~> 
		return if @is_sliding!
		if @is_grounded! and (key.down \s) then
			@is_sliding = true_for 0.35s
		else
			@vel.y = -VI if @is_grounded!
	key.press \k ~>
		shot {} {pos:v3(@pos.x+B*@dir,@pos.y,0),vel:v3(18*B*@dir,0,0)}
		@is_shooting = true_for 0.3s

	key.release \j ~> 
		@vel.y = 0 if @vel.y < 0

	sprite: "mememan/standing0"
	nome: "meme"
	is_sliding: just false
	is_shooting: just false
	is_stopped: ~> @vel.x == 0 and @vel.y == 0
	floats: false
	pos: v3(150,100,0)
	size: v3(22,25,0)
	vel: v3(0,0,0)
	tick: after @tick, ~> 
		@vel.x = switch
		| @is_sliding!	=> @dir*12*B
		| key.down \d	=> B*4.4
		| key.down \a	=> -B*4.4
		| _				=> 0

		@dir = 1 if @vel.x > 0
		@dir = -1 if @vel.x < 0

		@sprite = 
			if @is_grounded! then
				if @is_stopped! then
					if @is_shooting! then
						"mememan/standing_shoot"
					else
						"mememan/standing" + cycle([0,0,0,0,0,0,0,0,0,1],5)
				else
					if @is_shooting! then
						"mememan/walking_shoot" + cycle([0,1,2,1],0.5)
					else if @is_sliding! then
						"mememan/sliding"
					else
						"mememan/walking" + cycle([0,1,2,1],0.5)
			else
				if @is_shooting! then
					"mememan/jumping_shoot"
				else 
					"mememan/jumping"

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
				
		@sprite += \_r if @dir == 1


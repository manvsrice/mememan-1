global.bee_queen = mixin object, ->
	type: "bee_queen"
	sprite: "holding"
	floats: true
	collides: true
	deploy_x: void 
	size: v3(24,24,0)
	hp: 32
	dmg: 4
	state_time: chronometer!
	state: "waiting_hero"
	tick: after @tick, (dt) ~>
		switch (@state)
		| \waiting_hero => 
			if global.hero? then
				@deploy_x = global.hero.pos.x + 8*B
				@state = "positioning"
		| \positioning =>
			@sprite = "holding"
			@vel.x = signum(@deploy_x - @pos.x) * 8*B
			@dir = signum @vel.x
			if abs(@deploy_x - @pos.x)<4 then
				@state = "laying"
				setTimeout (~> @destroy!), 2500
			@state_time = chronometer!
		| \laying =>
			@sprite = "holding"
			@vel.x = 0
			if @state_time! > 1.5 then
				@state = "layed"
				bee pos:v3(@pos.x, @pos.y, 0)
				bee pos:v3(@pos.x - B, @pos.y, 0)
				bee pos:v3(@pos.x + B, @pos.y, 0)
				bee pos:v3(@pos.x, @pos.y - B, 0)
				bee pos:v3(@pos.x, @pos.y + B, 0)
				@state_time = chronometer!
			@dir = -1
		| \layed =>
			#@dir = signum(hero.pos.x - @pos.x)
			@sprite = "free"
			if @state_time > 1.5 then
				@destroy!

		#if Math.random! < 0.01 then
			#@vel.y = -12*B
			


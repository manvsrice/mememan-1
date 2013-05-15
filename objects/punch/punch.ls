global.punch = mixin object, ->
	type: "punch"
	sprite: "punch"
	tick: after @tick, ~> 
		if @age! > 1.1 then
			@vel = (@dir_to @owner.pos).multiplyScalar(8*B)
			#@vel = @owner.pos.clone().sub(@pos).normalize().multiplyScalar(-8*B)
			@destroy! if abs(@pos.x - @owner.pos.x) < 8
		@destroy! if @age! > 8
		@dir = signum(@vel.x)
	#is_shot: true #avoids collision with other shots
	side: @side ? "bad"
	size: v3(6,6,0)
	floats: true
	#collide: after @collide, ~> @hp = 0 if !it.is_shot and it.dynamic and it.side!=@side
	hp: 5
	dmg: @dmg ? 3

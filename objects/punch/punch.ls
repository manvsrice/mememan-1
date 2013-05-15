global.punch = mixin object, ->
	type: "punch"
	sprite: "punch"
	tick: after @tick, ~> 
		if @age! > 1.1 then
			@vel = (@dir_to @owner.pos).multiplyScalar(8*B)
			@destroy! if abs(@pos.x - @owner.pos.x) < 8
		@destroy! if @age! > 8
		@dir = signum(@vel.x)
	side: @side ? "bad"
	size: v3(6,6,0)
	floats: true
	hp: 5
	dmg: @dmg ? 3

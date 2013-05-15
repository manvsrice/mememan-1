global.punch = mixin object, ->
	type: "punch"
	sprite: "punch"
	tick: after @tick, ~> 
		if @age! > 1.6 then
			@vel = (@dir_to @owner.pos).multiplyScalar(8*B)
			#@vel = @owner.pos.clone().sub(@pos).normalize().multiplyScalar(-8*B)
			@destroy! if abs(@pos.x - @owner.pos.x) < B
		@destroy! if @age! > 5
		@dir = signum(@vel.x)
	is_shot: true #avoids collision with other shots
	side: @side ? "bad"
	size: v3(6,6,0)
	floats: true
	collide: ~> 
		@hp = 0 if !it.is_shot and it.side!=@side
		log @hp
	hp: 4
	dmg: @dmg ? 3

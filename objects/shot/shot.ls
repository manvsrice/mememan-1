global.shot = mixin object, ->
	type: "shot"
	sprite: "shot"
	tick: after @tick, ~> @destroy! if @age! > 1.2
	is_shot: true #avoids collision with other shots
	side: @side ? "bad"
	size: v3(4,4,0)
	floats: true
	collide: ~> 
		@hp = 0 if !it.is_shot
		log @hp
	hp: 1
	dmg: @dmg ? 2

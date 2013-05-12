global.shot = mixin thing, ->
	tick: after @tick, ~>
		if time_since(@created) > 1.2 then
			@destroy!
	floats: true
	created: now!
	sprite: "shot/shot"
	size: v3(4,4,0)
	collides: true
	dmg: 2
	collide: ~> 
		it.hp -= @dmg if it != @owner
		@destroy! if it.solid

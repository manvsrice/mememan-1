global.shot = mixin object, ->
	type: "shot"
	tick: after @tick, ~> @destroy! if time_since(@created) > 1.2
	created: now!
	sprite: "shot"
	side: @side ? "bad"
	size: v3(4,4,0)
	floats: true
	shot: true
	collide: ~> @hp=0 if !it.shot
	hp: 1
	dmg: @dmg ? 2

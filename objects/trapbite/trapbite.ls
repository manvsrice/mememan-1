global.trapbite = mixin object, ->
	type: "trapbite"
	sprite: "open"
	life_time: chronometer!
	tick: after @tick, ~> 
		@sprite = "closed" if @life_time! > 0.1
		@destroy! if @life_time! > 0.2
	vel: v3(0,-8*B,0)
	size: v3(12,6,0)
	floats: true
	ghost: true
	collides: true
	depth: 1
	hp: 12
	dmg: 3

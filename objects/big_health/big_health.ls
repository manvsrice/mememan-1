global.big_health = mixin object, ~>
	type:"big_health"
	sprite:"big_health"
	floats: true
	solid: false
	dynamic: false
	collide: ~>
		if it==hero
			hero.heal 12
	tick: after @tick,
		@sprite = "big_health" + cycle [0 1] 0.8s
		

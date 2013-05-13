global.trapdoor = mixin object, ->
	defer ~> @pos.x += 0.5*B
	type: "trapdoor"
	sprite: "trapdoor"
	floats: true
	collides: false
	solid: true
	size: v3(2*B,B,0)
	hp: 999
	dmg: 0
	exhausted: just false
	tick: after @tick, (dt) ~>
		if abs(hero.pos.x - @pos.x) < B and not @exhausted! then
			trapbite pos:@pos.clone()
			@exhausted = true_for 1s

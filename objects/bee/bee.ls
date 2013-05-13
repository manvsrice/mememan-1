global.bee = mixin object, ->
	type: "bee"
	sprite: "bee"
	floats: true
	collides: true
	deploy_x: void 
	size: v3(12,8,0)
	hp: 2
	dmg: 3
	tick: after @tick, (dt) ~>
		@vel.add(global.hero.pos.clone().sub(@pos).multiplyScalar(0.1))
		@vel.normalize().multiplyScalar(6*B);
			


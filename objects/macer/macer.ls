global.macer = mixin object, ->
	type: "macer"
	sprite: "standing0"
	floats: false
	size: v3(24,24,0) # for collision checking
	hp: 8
	dmg: 4
	tick: after @tick, (dt) ~>
		@dir = if hero.pos.x > @pos.x then 1 else -1

		@sprite = "standing" + cycle [0 1 2 3] 0.5s

		if Math.random! < 0.02 then
			@shot shot, dmg:2, pos:v3(@pos.x+B*@dir,@pos.y,0), vel:v3(22*B*@dir,0,0)




			


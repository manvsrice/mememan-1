global.hardman = mixin object, ->
	type: "hardman"
	sprite: "holding"
	deploy_x: void 
	size: v3(26,36,0)
	hp: 220
	maxhp: 220
	dmg: 12
	state_time: chronometer!
	state: \standing
	exhausted: just false
	set_state: ~> @state = it; @state_time = chronometer!
	draw: after @draw, ~> draw_healthbar @hp/@maxhp, 30, 8, "down", [255,0,0]
	tick: after @tick, (dt) ~>
		@dir = signum (hero.pos.x - @pos.x)

		switch (@state)
		| \standing => 
			@sprite = "standing" + cycle [0 1 2] 0.6s
			rnd = Math.random!
			if @state_time! > 0.8 then
				if (rnd -= 0.08) < 0 then
					@set_state \shooting
				else if (rnd -= 0.04) < 0 then
					@set_state \soaring
		| \shooting =>
			@sprite = "shooting" + cycle [0 1 2 3 4] 0.6s
			if not @exhausted! then
				@shot punch, vel:(@dir_to hero.pos).multiplyScalar(12*B)
				@exhausted = true_for 1s
			if Math.random! < 0.005 or @state_time! > 4 then
				@set_state \standing
		| \soaring =>
			@sprite = "soaring"
			@vel.y = -26*B
			if has_solid(@pos.x, @pos.y - 24) or has_solid(@pos.x - 24, @pos.y - 24) then
				@vel.y = 0
			@vel.x = signum(hero.pos.x - @pos.x) * 168
			if abs(@pos.x - hero.pos.x) < B/2 then
				@set_state \turning
		| \turning =>
			@vel.x = 0
			if @state_time! < 0.15 then
				@vel.y = 0
				@sprite = "turning0"
			else if @state_time! < 0.3 then
				@vel.y = 0
				@sprite = "turning1"
			else
				@vel.y = 36*8
				@set_state \diving
		| \diving =>
			@sprite = "diving"

			if @is_grounded! then
				@set_state \buried
				if hero.is_grounded! then
					log "poxa"
					log hero.vel.y
					hero.vel.y -= 12*B
					hero.pos.y -= 6
					setTimeout (~> hero.hurt 6), 100
					log hero.vel.y
				camera.pos.y -= 16
		| \buried =>
			if @state_time! < 0.6 then
				@sprite = "buried0"
			else if @state_time! < 2.4 then
				@sprite = "buried1"
			else
				@set_state "standing"
				
			

require! {key}
global.mememan = mixin object, ->
	global.hero = @
	
	@weapons =
		{name: "normal"
		tag: "P"
		shot: ~> @shot shot, {dmg:2, side: @side, pos:v3(@pos.x+B*@dir,@pos.y,0), vel:v3(22*B*@dir,0,0)}},
		{name: "poke"
		tag: "PM"
		charge: 24
		cost: 1
		shot: ~> 
			@shot pokeball, {
				pokemon: @pokemon
				dmg: 3
				pos: v3(@pos.x+B*@dir, @pos.y, 0) 
				vel: v3(
					12*B*(Number(@dir) + Number(key.down(key_right)) - Number(key.down(key_left))),
					12*B*(-1 + Number(key.down(key_down)) - Number(key.down(key_up))),
					0)}
			@pokemon = void
		},
		{name: ""
		tag: "-"},
		{name: ""
		tag: "-"},
		{name: ""
		tag: "-"}
	weapon: @weapons[0]
	type: "mememan"
	sprite: "standing0"
	floats: false
	dynamic: true
	lives: 3
	hp: 24
	depth: -1
	size: v3(16,25,0)
	vel: v3(0,0,0)
	key_a: ~>
	climb: (dir) ~>
		@is_climbing = just true
		@just_climbed = true_for 0.4
		@ghost = @floats = true
		@vel.y = B * 4.5 * (if dir==\down then 1 else -1)
	#draw: after @draw, (screen) ~>
		#if @pokemon then
			#screen.image sprite("objects/pokeball/sprites/pokeball.png"), @pos.x*@dir+camera.offset.x, @pos.y+camera.offset.y
	#draw: after @draw, (screen) ~>
		#screen.fill(0,0,0)
		#screen.rect 7, 8, 8, 57
		#screen.fill(255,255,0)
		#for y from 63 til (63-@hp*2) by -2
			#screen.rect 8, y, 6, 1
	fire_weapon: ~>
		if @is_walking! or @is_jumping! or @is_climbing! or @is_shooting! then
			global.play "shoot"
			if not @weapon.cost or @weapon.charge >= @weapon.cost then
				@weapon.shot!
				@weapon.charge -= @weapon.cost if @weapon.charge?
			@is_shooting = true_for 0.3s

	stop_jump: ~> @vel.y = 0 if @is_jumping!
	
	slide: ~> @is_sliding = true_for 0.35s if not @is_sliding!

	jump: ~> if not @is_jumping!
		@vel.y = -23*B if @is_grounded!
		@is_climbing = just false if @is_climbing!

	hurt: after @hurt, ~> 
		return if @is_immune!
		play "hurt"
		@vel.y += 3*B
		@just_hurt = true_for 0.5s
		@is_immune = true_for 1.2s

	pad: v3(0,0,0)
	tick: after @tick, (dt)  ~> 
		@dir = @pad.x if @pad.x != 0

		@vel.x = switch
		| @just_hurt! 		 => -@dir*2*B
		| @is_climbing! 	 => 0	
		| @is_sliding!		 => @dir*12*B
		| key.down key_right => B*4.4
		| key.down key_left	 => -B*4.4
		| _					 => 0

		if @is_climbing! then 
			if (not @just_climbed!)
				@vel.y = @pad.y * B * 3
			@dir = -1+floor((@pos.y/16)%2)*2 if @pad.x == 0 and not @is_shooting!
			
		@ghost = @floats = @is_climbing!
		@pos.x = align.pos.x if @is_climbing! and (align = (filter (.is_stair), get_around(@pos.x,@pos.y))[0])

		if @is_sliding! and not @has_solid_ahead! and @vel.y == 0 and @has_solid_over! then
				@ghost = @floats = true
				@is_sliding = true_for 0.04 

		if not @is_climbing! and not @is_sliding! then
			if key.down key_down and has_stair(@pos.x, @pos.y + B) then
				@climb \down
			else if key.down key_up and has_stair(@pos.x, @pos.y - B) then
				@climb \up
		else if @is_climbing! and not @just_climbed! and not has_stair(@pos.x,@pos.y + B/4) then
			@is_climbing = just false

		@sprite = switch
		| @just_hurt! => "hurt"
		| @is_climbing! => (if @is_almost_climbing! then "climbed" else "climbing" + (if @is_shooting! then "_shooting" else ""))
		| @is_sliding! => "sliding"
		| @is_standing! => (if @is_shooting! then "standing_shoot" else "standing" + cycle([0,0,0,0,0,0,0,0,0,1],4))
		| @is_grounded! => (if @is_shooting! then "walking_shoot" else "walking") + cycle [0 1 2 1] 0.5
		| _ => (if @is_shooting! then "jumping_shoot" else "jumping")

		@sprite = @weapon.name + "/" + @sprite
	dir: 1
	side: "good"
	is_sliding: just false
	is_shooting: just false
	is_climbing: just false
	is_digging: just false
	just_hurt: just false
	just_climbed: just false
	is_almost_climbing: ~> @is_climbing! and !has_stair(@pos.x,@pos.y - B/4) and has_stair(@pos.x,@pos.y + B/4)
	is_jumping: ~>  @vel.y < 0 and !@is_climbing!
	is_walking: ~> !@is_jumping! and !@is_climbing! and !@is_shooting!
	is_stopped: ~> @vel.x == 0 and @vel.y == 0
	is_standing: ~> @is_grounded! and @is_stopped!
	has_solid_ahead: ~>has_solid(@pos.x+@dir*B,@pos.y)
	has_solid_over: ~>not empty(filter (.solid), tree.get(@pos.x - @dir*B*1.1, @pos.y - B*1.5, @pos.x + @dir*B*1.1, @pos.y - B*0.5))

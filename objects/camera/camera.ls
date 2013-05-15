global.camera = do mixin -> 
	pos: v3(0,0,0),
	scale: window.innerHeight / (16*16)
	target_y: void
	width: 16*16 * window.innerWidth / window.innerHeight
	height: 16*16
	center: v3(8*16,8*16*window.innerWidth/window.innerHeight,0)
	visible_objects: ~>
		c = @center
		tree.get(c.x - 20*B, c.y - 10*B, c.x + 20*B, c.y + 10*B)
		#tree.get(c.x - 6*B, hero.pos.y - 6*B, c.x + 6*B, hero.pos.y + 6*B)
	tick: (dt) ~>
		@scale = window.innerHeight / (16*16)
		@width = window.innerWidth / @scale
		@center = v3(@pos.x, @pos.y + @height/2)
		@offset = 
			#x:-max(@pos.x,window.innerWidth/@scale/2) + window.innerWidth/@scale/2, 
			x:-@pos.x + window.innerWidth/@scale/2
			y:-@pos.y

		if !@target_y? and global.hero?.pos? then
			@pos.y = hero.pos.y - 16*16
			@target_y = floor(global.hero.pos.y/(16*16))*16*16
		@pos.x = global.hero.pos.x
		if hero?.pos.y < @target_y then
			@target_y -= 16*B
		if hero?.pos.y > @target_y + (16*16) then
			@target_y += 16*B
		if abs(@pos.y - @target_y)>8 then
			@pos.y += (@target_y - @pos.y)/abs(@target_y - @pos.y) * 12*16 * dt
		else
			@pos.y = @target_y

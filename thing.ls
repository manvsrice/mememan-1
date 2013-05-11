global.things = []
global.thing = mixin ->
	things.push @
	draw: (screen) ->
		screen.fill @col[0], @col[1], @col[2]
		screen.rect @pos.x-@size.x/2, @pos.y-@size.y/2, @size.x, @size.y
	destroy: ~>
		defer ~> things.splice (things.indexOf @), 1
	tick: (dt) ~>
		@pos.x += @vel.x*dt
		@pos.y += @vel.y*dt

		if !@floats then
			@pos.y += 0.5*G*dt*dt
			@vel.y += G*dt

		@is_grounded = just false
		(~>@check_collision it) `each` things
	check_collision: (b) ->
		a = @; abs = Math.abs;
		ax=a.pos.x; aw=a.size.x/2; axi=ax - aw; axf=ax+aw;
		ay=a.pos.y; ah=a.size.y/2; ayi=ay - ah; ayf=ay+ah;
		bx=b.pos.x; bw=b.size.x/2; bxi=bx - bw; bxf=bx+bw;
		by=b.pos.y; bh=b.size.y/2; byi=by - bh; byf=by+bh;
		dx=abs(bx - ax) - (aw+bw); 
		dy=abs(by - ay) - (ah+bh);
		return false if (dx>=0 or dy>=0)

		if (b.solid) then
			if (dx>dy) then
				if (bxi < axi < bxf) then a.pos.x += bxf - axi; a.vel.x = 0
				if (bxi < axf < bxf) then a.pos.x += bxi - axf; a.vel.x = 0
			else
				if (byi < ayi < byf) then a.pos.y += -dy; a.vel.y = 0
				if (byi < ayf < byf) then a.pos.y += dy; a.vel.y = 0; @is_grounded = just true
		a.collide? b
		true
	floats: true
	solid: false
	col: [200,200,200]
	size: v3(B,B,0)
	pos: v3(0,0,0)
	vel: v3(0,0,0)

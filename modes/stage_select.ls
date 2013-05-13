global.stage_select_mode = mixin ->
	global.mode = @
	key.press key_a, ~> game_mode! if global.mode == @
	key.press key_down, ~> log "af", @cursor.y++
	key.press key_up, ~> @cursor.y--
	key.press key_left, ~> @cursor.x--
	key.press key_right, ~> @cursor.x++
	stages:
		"00": "sparkman"
		"10": "snakeman"
		"20": "needleman"
		"01": "hardman"
		"11": ""
		"21": "topman"
		"02": "geminiman"
		"12": "magnetman"
		"22": "shadowman"

	cursor: v3(1,1,0)
	cursor_pos: v3(0,0,0)
	draw: (screen) ~>
		@cursor.x = 0 >? @cursor.x <? 2
		@cursor.y = 0 >? @cursor.y <? 2
		@pos = v3(camera.width/2 - title.width/2, 0)
		@cursor_pos = v3(@pos.x + 18 + 80*@cursor.x, @pos.y + 32 + 64*@cursor.y)

		screen.background 44 101 248
		screen.background 0 0 0
		color = if (now! % 0.25) < 0.125 then "red" else "blue"
		screen.image sprite("modes/stage_select/sprites/background.png"), @pos.x, @pos.y
		screen.image sprite("modes/stage_select/sprites/"+color+"_cursor.png"), @cursor_pos.x, @cursor_pos.y

		screen.image sprite("modes/stage_select/sprites/look_"+@cursor.x+@cursor.y+".png"), @pos.x + 18+10+80*1, @pos.y + 8+32+64*1

		for x from 0 to 2
			for y from 0 to 2
				screen.image sprite("modes/stage_select/sprites/"+@stages[""+x+y]+".png"), @pos.x + 18 + 10 + 80*x, @pos.y + 8 + 32 + 64*y


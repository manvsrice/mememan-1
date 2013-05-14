global.stage_select_mode = mixin ->
	global.mode = @
	bg_music "stage_select"

	key.press key_a, ~> 
		return if global.mode != @
		stage_info = @stages[""+@cursor.x+@cursor.y]
		global.stage = stage_info.stage
		game_mode! 

	key.press key_down, ~> log "af", @cursor.y++ if global.mode == @
	key.press key_up, ~> @cursor.y-- if global.mode == @
	key.press key_left, ~> @cursor.x-- if global.mode == @
	key.press key_right, ~> @cursor.x++ if global.mode == @

	stages:
		"00": name: "sparkman", stage: hardstage
		"10": name: "snakeman", stage: hardstage
		"20": name: "needleman", stage: hardstage
		"01": name: "hardman", stage: hardstage
		"11": name: "", stage: hardstage
		"21": name: "topman", stage: hardstage
		"02": name: "geminiman", stage: hardstage
		"12": name: "magnetman", stage: hardstage
		"22": name: "shadowman", stage: hardstage

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
		screen.image sprite("modes/stage_select_mode/sprites/background.png"), @pos.x, @pos.y
		screen.image sprite("modes/stage_select_mode/sprites/"+color+"_cursor.png"), @cursor_pos.x, @cursor_pos.y
		screen.image sprite("modes/stage_select_mode/sprites/look_"+@cursor.x+@cursor.y+".png"), @pos.x + 18+10+80*1, @pos.y + 8+32+64*1
		for x from 0 to 2
			for y from 0 to 2
				screen.image sprite("modes/stage_select_mode/sprites/"+@stages[""+x+y].name+".png"), @pos.x + 18 + 10 + 80*x, @pos.y + 8 + 32 + 64*y


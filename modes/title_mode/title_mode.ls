global.title_mode = mixin ->
	global.mode = @

	bg_music "title"

	key.press key_down,	 ~> @option = "password" if global.mode == @
	key.press key_up,	 ~> @option = "gamestart" if global.mode == @
	key.press key_start, ~> stage_select_mode! if global.mode == @

	# Hacky code to preload sprites on title screen so they don't blink
	log "Loading sprites..."
	preload = map ("modes/stage_select_mode/sprites/"+), 
		<[look_00 look_01 look_02 look_10 look_11 look_12 look_20 look_21 look_22]>
	preload ++= map ("objects/mememan/sprites/"+),
		<[climbed climbed_shooting climbing hurt jumping jumping_shoot sliding
		standing_shoot standing0 standing1 standing2 walking_shoot0 walking_shoot1 walking_shoot2
		walking0 walking1 walking2]>
	preload ++= map ("objects/trapbite/sprites/"+), <[closed open]>
	preload ++= map ("objects/trapdoor/sprites/"+), <[trapdoor]>
	preload ++= map ("objects/ground/sprites/"+),
		<[Bottom0 Bottom1 BottomLeft BottomRight Center0 Center1
		Center2 Center3 Left0 Left1 Right0 Right1 Top0 Top1 TopLeft TopRight]>
	preload ++= map ("objects/bar/sprites/"+), <[bar]>
	preload ++= map ("objects/bee/sprites/"+), <[bee]>
	preload ++= map ("objects/bee/sprites/"+), <[free holding]>
	preload ++= map ("objects/macer/sprites/"+), <[standing0 standing1 standing2 standing3 throwing]>
	preload ++= map ("objects/macer/sprites/"+), <[standing0 standing1 standing2 standing3 throwing]>
	preload ++= map ("objects/rock/sprites/"+), <[rock]>
	preload ++= map ("objects/shot/sprites/"+), <[shot]>
	preload ++= map ("objects/stair/sprites/"+), <[stair]>
	preload ++= map ("modes/stage_select_mode/sprites/"+), 
		<[background look_00 look_01 look_02 look_10 look_11 look_12 look_20 look_21 look_22 
		geminiman hardman magnetman needleman shadowman snakeman sparkman topman wtfisdisguy]>

	for spr in preload
		sprite(spr+".png")
		sprite(spr+"_r.png")

	draw: (screen) ~>
		screen.background 0 0 0
		global.title = sprite("modes/title_mode/sprites/background.png")
		screen.image title, camera.width/2 - title.width/2, 0

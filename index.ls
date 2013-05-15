require! {$:boxes,key:key,_:lodash,v3:three_vector3,buzz}
global.B = 16 #length of the tile of the game - only change this if you are going to remake the entire game using a different sprite size!
global.G = 84*B #gravity
global.key_left = \a
global.key_down = \s
global.key_right = \d
global.key_up =	\w
global.key_a = \j
global.key_b = \k
global.key_start = \l
global.now = -> Date.now!/1000
global.last_tick = now!
global.just = (val) -> -> val
global.true_for = (secs) -> start = now!; -> (now! - start) < secs
global.time_since = -> (now! - it)
global.cycle = (arr,interval) -> arr[floor((now!%interval)/interval*arr.length)]
global.chronometer = (initial=now!) ~> ~> now! - initial
global.blink = (interval) ~> (now! % interval)<(interval/2)
require "./sound/sound"
require "./objects/camera/camera"
require "./objects/object"
require "./objects/mememan/mememan"
require "./objects/macer/macer"
require "./objects/bee_queen/bee_queen"
require "./objects/bee/bee"
require "./objects/trapdoor/trapdoor"
require "./objects/trapbite/trapbite"
require "./objects/hardman/hardman"
require "./objects/rock/rock"
require "./objects/shot/shot"
require "./objects/pokeball/pokeball"
require "./objects/ground/ground"
require "./objects/bar/bar"
require "./objects/stair/stair"
require "./objects/punch/punch"
require "./stages/stage"
require "./stages/hardstage/hardstage"
require "./modes/stage_select_mode/stage_select_mode"
require "./modes/game_mode/game_mode"
require "./modes/title_mode/title_mode"

global.canvas = processing window.innerWidth, window.innerHeight,
	setup: -> 
		global.sprite = _.memoize (url) ~> @loadImage url
		global.draw_sprite = (spr,x,y) ~> @image spr, x - spr.width/2 + camera.offset.x, y - spr.height/2 + camera.offset.y
		global.draw_healthbar = (hp,x,y,dir = "down",col = [255 255 0]) ~>
			max = 24
			switch (dir)
			| \down 	=> bar_w = 6; bar_h = 1; w = bar_w+2; h = bar_h*max*2+1; sx = x+1; sy = y+h - 2; addx = 0; addy = -2;
			| \right 	=> bar_w = 1; bar_h = 6; w = bar_w*max*2+1; h = bar_h+2; sx = x + 1; sy = y+1; addx = 2; addy = 0;
			@fill(0,0,0)
			@rect x, y, w, h
			@fill(col[0],col[1],col[2])
			for i from 0 til floor(hp*max)
				@rect sx+i*addx, sy+i*addy, bar_w, bar_h
		global.courier_new = @loadFont("courier new")

		# Note: adding the sprites here is not necessary, but that will cause
		# them to load upon demand and, thus, new things could be invisible
		# for a while when they appear
		log "Loading sprites..."
		preload = map ("modes/stage_select_mode/sprites/"+), 
			<[look_00 look_01 look_02 look_10 look_11 look_12 look_20 look_21 look_22]>
		for wpn in <[normal poke]>
			preload ++= map ("objects/mememan/sprites/"+wpn+"/"+), <[climbed climbing_shooting climbing hurt jumping jumping_shoot sliding
					standing_shoot standing0 standing1 walking_shoot0 walking_shoot1 walking_shoot2
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
		preload ++= map ("objects/punch/sprites/"+), <[punch]>
		preload ++= map ("objects/shot/sprites/"+), <[shot]>
		preload ++= map ("objects/stair/sprites/"+), <[stair]>
		preload ++= map ("modes/stage_select_mode/sprites/"+), 
			<[background look_00 look_01 look_02 look_10 look_11 look_12 look_20 look_21 look_22 
			geminiman hardman magnetman needleman shadowman snakeman sparkman topman wtfisdisguy]>
		preload ++= map ("objects/hardman/sprites/"+),
			<[buried0 buried1 diving punch shooting0 shooting1 shooting2 shooting3 shooting4 soaring standing0 turining0 turning1]>
		for spr in preload
			sprite(spr+".png")
			sprite(spr+"_r.png")

		@noStroke!
		@scale camera.scale

		title_mode!
	draw: -> 
		global.screen = @
		@scale camera.scale
		mode.draw @
$("body").append canvas

#audio = $("<audio/>");
#audio.attr("src","audio/MM_1up.wav");
#audio[0].play();


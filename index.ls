require! {$:boxes,key:key,_:lodash,v3:three_vector3,buzz}
require "./sound/sound"
require "./objects/camera/camera"
require "./objects/object"
require "./objects/mememan/mememan"
require "./objects/macer/macer"
require "./objects/bee_queen/bee_queen"
require "./objects/bee/bee"
require "./objects/trapdoor/trapdoor"
require "./objects/trapbite/trapbite"
require "./objects/rock/rock"
require "./objects/shot/shot"
require "./objects/ground/ground"
require "./objects/bar/bar"
require "./objects/stair/stair"
require "./stages/stage"
require "./stages/hardstage/hardstage"
require "./modes/stage_select_mode/stage_select_mode"
require "./modes/game_mode/game_mode"
require "./modes/title_mode/title_mode"
global.B = 16 #length of the tile of the game - only change this if you are going to remake the entire game using a different sprite size!
global.G = 84*B #gravity
global.now = -> Date.now!/1000
global.just = (val) -> -> val
global.true_for = (secs) -> start = now!; -> (now! - start) < secs
global.time_since = -> (now! - it)
global.cycle = (arr,interval) -> arr[floor((now!%interval)/interval*arr.length)]
global.chronometer = (initial=now!) ~> ~> now! - initial
global.mode = "title"
global.key_left = \a
global.key_down = \s
global.key_right = \d
global.key_up =	\w
global.key_a = \j
global.key_b = \k
global.key_start = \l
global.last_tick = now!
global.canvas = processing window.innerWidth, window.innerHeight,
	setup: -> 
		global.sprite = _.memoize (url) ~> @loadImage url
		global.title = @loadImage "sprites/title.png"

		preload = map ("modes/stage_select_mode/sprites/"+), 
			<[look_00 look_01 look_02 look_10 look_11 look_12 look_20 look_21 look_22]>
		preload ++= map ("objects/mememan/sprites/"+),
			<[climbed climbed_shooting climbing hurt jumping jumping_shoot sliding
			standing_shoot standing0 standing1 standing2 walking_shoot0 walking_shoot1 walking_shoot2
			walking0 walking1 walking2]>
		preload ++= map ("objects/ground/sprites/"+),
			<[Bottom0 Bottom1 BottomLeft BottomRight Center0 Center1
			Center2 Center3 Left0 Left1 Right0 Right1 Top0 Top1 TopLeft TopRight]>
		for spr in preload
			sprite(spr+".png")
			sprite(spr+"_r.png")


		@noStroke!
		@scale camera.scale
		title_mode!
	draw: -> 
		@scale camera.scale
		mode.draw @
		#log hero.pos.x, hero.pos.y
		#log global.drw
		#objects |> each ~>
			#img = sprite(it.sprite ? "ground/0")
			#@rect it.pos.x - it.size.x/2, it.pos.y - it.size.y/2, it.size.x, it.size.y #show hitbox (debug)
			#@image img, it.pos.x - img.width/2, it.pos.y - img.height/2

$("body").append canvas

#audio = $("<audio/>");
#audio.attr("src","audio/MM_1up.wav");
#audio[0].play();


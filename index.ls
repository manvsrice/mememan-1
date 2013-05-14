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
global.key_left = \a
global.key_down = \s
global.key_right = \d
global.key_up =	\w
global.key_a = \j
global.key_b = \k
global.key_start = \l
global.canvas = processing window.innerWidth, window.innerHeight,
	setup: -> 
		global.sprite = _.memoize (url) ~> @loadImage url
		@noStroke!
		@scale camera.scale
		title_mode!
	draw: -> 
		@scale camera.scale
		mode.draw @

$("body").append canvas
global.now = -> Date.now!/1000
global.last_tick = now!
global.just = (val) -> -> val
global.true_for = (secs) -> start = now!; -> (now! - start) < secs
global.time_since = -> (now! - it)
global.cycle = (arr,interval) -> arr[floor((now!%interval)/interval*arr.length)]
global.chronometer = (initial=now!) ~> ~> now! - initial

#audio = $("<audio/>");
#audio.attr("src","audio/MM_1up.wav");
#audio[0].play();


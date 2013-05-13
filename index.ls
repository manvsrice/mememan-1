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
require "./stages/stage"
require "./objects/stair/stair"
require "./modes/stage_select"
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
global.title_mode = mixin ->
	global.mode = @
	key.press key_down,	 ~> @option = "password" if global.mode == @
	key.press key_up,	 ~> @option = "gamestart" if global.mode == @
	key.press key_start, ~> stage_select_mode! if global.mode == @
	draw: (screen) ~>
		screen.background 0 0 0
		screen.image title, camera.width/2 - title.width/2, 0
global.game_mode = mixin ->
	global.mode = @
	stage!.create!
	key.press key_start, ~> 
		return if mode != @
		play "pause"
		@paused = !@paused
	paused: false
	draw: (screen) ~>
		if @paused then
			screen.fill 107, 8, 0
			screen.rect 0, camera.height * 3/4, camera.width, camera.height*1/4
			return
		screen.background 222 222 222
		near_objects = tree.get(hero.pos.x - B*24, hero.pos.y - B*24, hero.pos.x + B*24, hero.pos.y + B*24)
		near_objects.sort (a,b)->b.depth - a.depth
		#remove near_objects, hero
		#near_objects.push hero
		for i from -3 to 3
			screen.image background, background.width * i, 0
		dt = min((now! - global.last_tick),0.04)
		camera.tick dt
		(.tick dt) `each` near_objects
		global.last_tick := now!
		(~>it.draw screen) `each` near_objects
global.canvas = processing window.innerWidth, window.innerHeight,
	setup: -> 
		global.sprite = _.memoize (url) ~> @loadImage url
		global.title = @loadImage "sprites/title.png"
		global.background = @loadImage "sprites/background.png"
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


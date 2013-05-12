require! {$:boxes,key:key,_:lodash,v3:victhree.v3}
require "./thing"
require "./mememan"
require "./shot"
require "./ground"
require "./level"
require "./stair"
global.B = 16 #length of the tile of the game - only change this if you are going to remake the entire game using a different sprite size!
global.VI = 23*B #initial velocity of jump (shouldn't be global, yea, but I'm adjusting that)
global.G = 84*B #gravity
global.now = -> Date.now!/1000
global.just = (val) -> -> val
global.true_for = (secs) -> start = now!; -> (now! - start) < secs
global.time_since = -> (now! - it)
global.width = window.innerWidth
global.height = window.innerHeight
global.camera = do mixin -> 
	width: window.innerWidth
	height: window.innerHeight
	pos:v3(0,0,0),
	scale:height/(16*16)
	offset: ~> x:-max(@pos.x,@width/@scale/2) + @width/@scale/2, y:0
	tick: ~>
		if global.hero?.pos.y < @y then
			@y -= 8*16
last_time = now!

global.canvas = processing camera.width, camera.height,
	-> 
		global.sprite = _.memoize (url) ~> @loadImage url+".png"

		sprs = map ("mememan/"+), <[
			climbed climbing jumping jumping_shoot sliding 
			standing_shoot standing0 standing1 walking_shoot0 
			walking_shoot1 walking_shoot2 walking0 walking1 walking2]>

		for spr in sprs
			sprite(spr)
			sprite(spr+"_r")

		global.background = @loadImage "background.png"
		# tamanho original da tela: 320x320
	->
		camera.tick!

		@scale camera.scale
		@background 222 222 222
		@noStroke!

		for i from -3 to 3
			@image background, background.width * i, 0

		dt = min((now! - last_time),0.05)
		(.tick dt) `each` things
		last_time := now!

		(~>it.draw @) `each` things
		#things |> each ~>
			#img = sprite(it.sprite ? "ground/0")
			#@rect it.pos.x - it.size.x/2, it.pos.y - it.size.y/2, it.size.x, it.size.y #show hitbox (debug)
			#@image img, it.pos.x - img.width/2, it.pos.y - img.height/2

$("body").append canvas
log canvas

level!.create!
		

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
global.camera = do mixin -> pos:v3(0,0,0), scale:3, offset: ~> x:-@pos.x + canvas.width/@scale/2, y:0
last_time = now!

global.canvas = processing window.innerWidth, window.innerHeight,
	-> 
		global.sprite = _.memoize (url) ~> @loadImage url+".png"

		sprs = map ("mememan/"+), <[
			climbed climbing jumping jumping_shoot sliding 
			standing_shoot standing0 standing1 walking_shoot0 
			walking_shoot1 walking_shoot2 walking0 walking1 walking2]>

		for spr in sprs
			sprite(spr)
			sprite(spr+"_r")
	->
		@scale camera.scale
		@background 240 240 240
		@noStroke!

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
		

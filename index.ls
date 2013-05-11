require! {$:boxes,key:key,_:lodash,v3:victhree.v3}
require "./thing"
require "./mememan"
require "./shot"
require "./ground"
require "./level"
global.B = 16 #length of the horizontal bar (scale of the game)
global.VI = 22*B #initial velocity of jump (shouldn't be global, yea, but I'm adjusting that)
global.G = 84*B #gravity
global.now = -> Date.now!/1000

global.just = (val) -> -> val
global.true_for = (secs) -> start = now!; -> (now! - start) < secs
global.time_since = -> (now! - it)
last_time = now!
$("body").append (processing 1200, 800,
	-> 
		global.sprite = _.memoize (url) ~> @loadImage url+".png"
	->
		@scale 1.5
		@background 240 240 240
		@strokeWeight 3
		dt = (now! - last_time)
		(.tick dt) `each` things
		last_time := now!
		things |> each ~>
			img = sprite(it.sprite ? "ground/0")
			#@rect it.pos.x - it.size.x/2, it.pos.y - it.size.y/2, it.size.x, it.size.y #show hitbox (debug)
			@image img, it.pos.x - img.width/2, it.pos.y - img.height/2
)

level!
		

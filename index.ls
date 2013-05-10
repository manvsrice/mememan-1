require! {$:boxes,key:key,_:lodash,v3:victhree.v3}
require "./thing"
require "./mememan"
require "./shot"
require "./floor"
require "./level"

global.B = 24 #length of the horizontal bar (scale of the game)
global.VI = 6*B #initial velocity of jump (shouldn't be global, yea, but I'm adjusting that)
global.G = 12*B #gravity
last_time = Date.now!
$("body").append (processing 1200, 800,
	-> 
		global.sprite = _.memoize (url) ~> @loadImage url+".png"
	->
		@background 240 240 240
		@strokeWeight 3
		dt = (Date.now! - last_time)/1000
		(.tick dt) `each` things
		last_time := Date.now!
		(~>@image sprite(it.sprite ? "mememan/0"), it.pos.x, it.pos.y) `each` things
)

level!
		

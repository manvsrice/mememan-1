require! {key}
global.mememan = mixin thing, ->
	key.press \j ~> @jump!
	key.press \k ~> @shot!
	key.release \j ~> @stop_jump!

	sprite: "mememan/1"
	nome: "meme"
	floats: false
	pos: v3(150,100,0)
	size: v3(B*0.7,B,0)
	vel: v3(0,0,0)
	jump: ~> @vel.y = -VI if @grounded
	stop_jump: ~> @vel.y = 0 if @vel.y < 0
	shot: ~> shot {} {pos:^^@pos,vel:v3(8*B*@dir,0,0)}
	tick: after @tick, ~> 
		@vel.x = switch
		| key.down \d => B*2.5
		| key.down \a => -B*2.5
		| _ => 0
		@dir = 1 if @vel.x > 0
		@dir = -1 if @vel.x < 0

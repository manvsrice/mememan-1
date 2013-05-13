require! {$:boxes,key:key,_:lodash,v3:victhree.v3}
require "./objects/camera/camera"
require "./objects/object"
require "./objects/mememan/mememan"
require "./objects/macer/macer"
require "./objects/shot/shot"
require "./objects/ground/ground"
require "./stages/stage"
require "./objects/stair/stair"
global.B = 16 #length of the tile of the game - only change this if you are going to remake the entire game using a different sprite size!
global.G = 84*B #gravity
global.now = -> Date.now!/1000
global.just = (val) -> -> val
global.true_for = (secs) -> start = now!; -> (now! - start) < secs
global.time_since = -> (now! - it)
global.cycle = (arr,interval) -> arr[floor((now!%interval)/interval*arr.length)]
global.paused = false
last_time = now!

global.canvas = processing window.innerWidth, window.innerHeight,
	setup: -> 
		stage!.create!
		global.sprite = _.memoize (url) ~> @loadImage url
		#(->sprite(it); sprite(it+"_r")) `each` map ("objects/mememan/sprites/"+), <[
			#climbed climbing jumping jumping_shoot sliding 
			#standing_shoot standing0 standing1 walking_shoot0 
			#walking_shoot1 walking_shoot2 walking0 walking1 walking2]>

		global.background = @loadImage "sprites/background.png"
		@noStroke!
	draw: ->
			
		
		#@translate -camera.offset!.x, -camera.offset!.y
		@scale camera.scale


		key.press \l -> global.paused=true
		if global.paused then
			@fill 107, 8, 0
			@rect 0, camera.height * 3/4, camera.width, camera.height*1/4
			return

		@background 222 222 222

		global.near_objects = tree.get(hero.pos.x - B*16, hero.pos.y - B*16, hero.pos.x + B*16, hero.pos.y + B*16)

		remove near_objects, hero
		near_objects.push hero

		for i from -3 to 3
			@image background, background.width * i, 0

		dt = min((now! - last_time),0.05)
		camera.tick dt
		(.tick dt) `each` near_objects
		last_time := now!

		(~>it.draw @) `each` near_objects



		#log hero.pos.x, hero.pos.y
		#log global.drw
		#objects |> each ~>
			#img = sprite(it.sprite ? "ground/0")
			#@rect it.pos.x - it.size.x/2, it.pos.y - it.size.y/2, it.size.x, it.size.y #show hitbox (debug)
			#@image img, it.pos.x - img.width/2, it.pos.y - img.height/2

$("body").append canvas
log canvas

		


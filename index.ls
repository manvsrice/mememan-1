require! {$:boxes,key:key,_:lodash,v3:victhree.v3}
require "./thing"
require "./mememan"
require "./macer"
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
global.camera = mixin -> 
	screen_width: window.innerWidth
	screen_height: window.innerHeight
	pos:v3(0,0,0),
	scale:window.innerHeight/(16*16)
	offset: ~> x:-max(@pos.x,@screen_width/@scale/2) + @screen_width/@scale/2, y:-@pos.y
	target_y: void
	tick: (dt) ~>
		if !@target_y? and global.hero?.pos? then
			@pos.y = hero.pos.y - 16*16
			@target_y = floor(global.hero.pos.y/(16*16))*16*16
		@pos.x = global.hero.pos.x
		if hero?.pos.y < @target_y then
			@target_y -= 16*B
		if hero?.pos.y > @target_y + (16*16) then
			@target_y += 16*B
		if abs(@pos.y - @target_y)>2 then
			@pos.y += (@target_y - @pos.y)/abs(@target_y - @pos.y) * 12*16 * dt
		else
			@pos.y = @target_y
last_time = now!

global.canvas = processing window.innerWidth, window.innerHeight,
	-> 
		level!.create!
		global.camera = global.camera!

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
		@scale camera.scale
		@background 222 222 222
		@noStroke!

		near_things = tree.get(hero.pos.x - B*16, hero.pos.y - B*16, hero.pos.x + B*16, hero.pos.y + B*16)

		for i from -3 to 3
			@image background, background.width * i, 0

		dt = min((now! - last_time),0.05)
		camera.tick dt
		(.tick dt) `each` near_things
		last_time := now!

		global.drw = 0
		(~>it.draw @) `each` near_things
		log global.drw
		#things |> each ~>
			#img = sprite(it.sprite ? "ground/0")
			#@rect it.pos.x - it.size.x/2, it.pos.y - it.size.y/2, it.size.x, it.size.y #show hitbox (debug)
			#@image img, it.pos.x - img.width/2, it.pos.y - img.height/2

$("body").append canvas
log canvas

		


global.stage = mixin ->
	stage_map: <[
		................................................
		..........o...o..o....ooo......o...o............
		..........o...o......o.........o...o............
		..........o...o..o..o..........o...o............
		..........o...o..o..o.......o.........o.........
		...........o.o...o...o.......oo.....oo..........
		............o....o....ooo......ooooo............
		................................................
		................................................
		................................................
		................................................
		................................................
		......................M.........................
		oooooooooooooooooooooooooooooooooooooooooooooooo
		oooooooooooooooooooooooooooooooooooooooooooooooo
		oooooooooooooooooooooooooooooooooooooooooooooooo
		oooooooooooooooooooooooooooooooooooooooooooooooo
	]>
	music: "hardman" 
	objects:
		o: ground
		M: mememan
		B: bee_queen
		X: bar
		h: stair
		T: trapdoor
		m: macer
		H: stair
	create: ~>
		log @
		bg_music @music
		stage_map = map (.split("")), @stage_map
		objects_at = (x,y) ~> 
			obj = @objects[stage_map[y]?[x]]
			if obj? then [] ++ obj else []
		has_at = (type,x,y) ~> type in objects_at(x,y)
		for y from 0 til stage_map.length
			for x from 0 til stage_map[y].length
				for obj in objects_at(x,y)
					border_type =
						if !has_at(obj,x+1,y) and !has_at(obj,x+1,y-1) and !has_at(obj,x,y-1) then
							"TopRight"
						else if !has_at(obj,x,y-1) and !has_at(obj,x-1,y-1) and !has_at(obj,x-1,y) then
							"TopLeft"
						else if !has_at(obj,x-1,y) and !has_at(obj,x-1,y+1) and !has_at(obj,x,y+1) then
							"BottomLeft"
						else if !has_at(obj,x,y+1) and !has_at(obj,x+1,y+1) and !has_at(obj,x+1,y) then
							"BottomRight"
						else if !has_at(obj,x+1,y) then
							"Right"+y%2
						else if !has_at(obj,x,y-1) then
							"Top"+(x+1+y%2)%2
						else if !has_at(obj,x-1,y) then
							"Left"+y%2
						else if !has_at(obj,x,y+1) then
							"Bottom"+x%2
						else
							"Center"+(x%2+y%2*2)
					obj {border_type:border_type} {pos:v3(x*B,y*B,0)}
					


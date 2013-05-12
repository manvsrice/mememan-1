global.level = mixin ->
	map: <[
		...................................................................................oooooooooooooooooooooooooooooooooooooooooooo
		..........o...o..o....ooo......o...o...............................................ooooooooooooHooooooooooooooooooooooooooooooo
		..........o...o......o.........o...o...............................................ooooooooooooHooooooooooooooooooooooooooooooo
		..........o...o..o..o..........o...o................................................oooo.......H.......oooooooooooooooooooooooo
		..........o...o..o..o.......o.........o.............................................oooo...............oooooooooooooooooooooooo
		...........o.o...o...o.......oo.....oo...............................................ooo...............oooooooooooooooooooooooo
		............o....o....ooo......ooooo.................................................ooo.*.......M.....oooooooooooooooooooooooo
		......................................................................................oooox.x.x.ooooooHoooooooooooooooooooooooo
		......................................................................................ooooooooooooooooHoooooooooooooooooooooooo
		..........................................................ooooo........oo...............ooooooooooooooHoooooooooooooooooooooooo
		......................................................ooooooooo......oooo...............ooooooooooooooHoooooooooooooooooooooooo
		.......................................oo............ooooooooooooo...oooooo........ooo....ooooooooo....oooooooooooooooooooooooo
		......................................oooo...........oooooooooooooo..oooooox.x.x..oooo.................oooooooooooooooooooooooo
		ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
		ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
		ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
		ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
	]>
	objects:
		o: ground
		M: (a,b) -> defer (->mememan a, b)
		H: stair
	create: ~>
		level_map = map (.split("")), @map
		object_at = (x,y) ~> @objects[level_map[y]?[x]]
		for y from 0 til level_map.length
			for x from 0 til level_map[y].length
				border_type =
					if !object_at(x+1,y)? and !object_at(x+1,y-1)? and !object_at(x,y-1)? then
						"TopRight"
					else if !object_at(x,y-1)? and !object_at(x-1,y-1)? and !object_at(x-1,y)? then
						"TopLeft"
					else if !object_at(x-1,y)? and !object_at(x-1,y+1)? and !object_at(x,y+1)? then
						"BottomLeft"
					else if !object_at(x,y+1)? and !object_at(x+1,y+1)? and !object_at(x+1,y)? then
						"BottomRight"
					else if !object_at(x+1,y)? then
						"Right"+y%2
					else if !object_at(x,y-1)? then
						"Top"+(x+1+y%2)%2
					else if !object_at(x-1,y)? then
						"Left"+y%2
					else if !object_at(x,y+1)? then
						"Bottom"+x%2
					else
						"Center"+(x%2+y%2*2)
				object_at(x,y)? {border_type:border_type} {pos:v3(x*B,y*B,0)}

#slice2d = (arr,x,y,X,Y) -> [arr[j].slice(x,X) for j from y til Y]

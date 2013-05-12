#global.has_stair = (x,y) ->
	#filter (.is_stair), get_around(x,y)
	#for obj in tree.get(x - B/2,y - B/2,x + B/2,y + B/2)
		#if (obj.is_stair) then
			#return true
	#false
			
global.stair = mixin thing, ->
	defer ~>
		@solid = true if !has_stair(@pos.x,@pos.y - B)
	sprite:"stair/stair"
	solid: false
	floats: true
	is_stair:true

global.pokeball = mixin object, ->
	type: "pokeball"
	sprite: "pokeball"
	size: v3(8,8,0)
	is_shot: true
	hp: 30
	locked: false
	tick: after @tick, ~>
		if @age! > 1.2 and !@pokemon? then
			@destroy!
	collide: ~>
		if @pokemon? then
			if it == @owner then
				it.pokemon = @pokemon
				@destroy!
			else if !@locked then
				(global[@pokemon]? pos: @pos.clone().add(v3(0,0,0)), owner:@owner) <<< {side:"good"}
				@pokemon = void
				@destroy!
		else if it.dynamic and !it.is_shot and it != @owner then
			it.destroy!
			@pokemon = it.type
			@locked = true
			log "captured", @pokemon
			@vel = v3(0,0,0)

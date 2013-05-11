global.shot = mixin thing, ->
	sprite: "shot/shot"
	size: v3(7,7,0)
	collide: ~> @destroy! if it.solid

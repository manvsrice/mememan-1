global.shot = mixin thing, ->
	sprite: "megaman/5"
	size: v3(4,4,0)
	collide: ~> @destroy! if it.solid

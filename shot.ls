global.shot = mixin thing, ->
	sprite: "shot/shot"
	size: v3(4,4,0)
	collides: true
	collide: ~> @destroy! if it.solid

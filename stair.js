require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.stair = mixin(thing, function(){
    var this$ = this;
    defer(function(){
      if (!has_stair(this$.pos.x, this$.pos.y - B)) {
        return this$.solid = true;
      }
    });
    return {
      sprite: "stair/stair",
      solid: false,
      floats: true,
      is_stair: true
    };
  });
}).call(this);

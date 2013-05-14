require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.stair = mixin(object, function(){
    var this$ = this;
    defer(function(){
      if (!has_stair(this$.pos.x, this$.pos.y - B)) {
        return this$.solid = true;
      }
    });
    return {
      type: "stair",
      sprite: "stair",
      solid: false,
      dynamic: false,
      is_stair: true
    };
  });
}).call(this);

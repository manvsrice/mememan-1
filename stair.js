require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.stair = mixin(thing, function(){
    return {
      sprite: "stair/stair",
      solid: true,
      floats: true,
      is_stair: true
    };
  });
}).call(this);

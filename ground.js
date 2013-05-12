require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.ground = mixin(thing, function(){
    return {
      sprite: "ground/" + this.border_type,
      floats: true,
      solid: true
    };
  });
}).call(this);

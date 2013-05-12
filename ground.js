require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.ground = mixin(thing, function(){
    return {
      sprite: "ground/" + this.border_type,
      solid: true
    };
  });
}).call(this);

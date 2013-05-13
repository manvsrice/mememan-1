require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.ground = mixin(object, function(){
    return {
      type: "ground",
      sprite: this.border_type,
      floats: true,
      solid: true
    };
  });
}).call(this);

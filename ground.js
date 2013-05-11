require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.ground = mixin(thing, function(){
    return {
      sprite: "ground/0",
      solid: true
    };
  });
}).call(this);

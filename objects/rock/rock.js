require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.rock = mixin(object, function(){
    return {
      type: "rock",
      sprite: "rock",
      floats: true,
      solid: true
    };
  });
}).call(this);

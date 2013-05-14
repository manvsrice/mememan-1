require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.rock = mixin(object, function(){
    return {
      type: "rock",
      sprite: "rock",
      dynamic: false,
      solid: false
    };
  });
}).call(this);

require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.floor = mixin(thing, function(){
    return {
      solid: true
    };
  });
}).call(this);

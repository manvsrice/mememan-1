require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.bar = mixin(object, function(){
    return {
      type: "bar",
      sprite: "bar",
      dynamic: false,
      solid: true
    };
  });
}).call(this);

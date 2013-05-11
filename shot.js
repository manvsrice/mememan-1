require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.shot = mixin(thing, function(){
    var this$ = this;
    return {
      sprite: "shot/shot",
      size: v3(7, 7, 0),
      collide: function(it){
        if (it.solid) {
          return this$.destroy();
        }
      }
    };
  });
}).call(this);

require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.shot = mixin(thing, function(){
    var this$ = this;
    return {
      sprite: "shot/shot",
      size: v3(4, 4, 0),
      collides: true,
      collide: function(it){
        if (it.solid) {
          return this$.destroy();
        }
      }
    };
  });
}).call(this);

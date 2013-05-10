require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.shot = mixin(thing, function(){
    var this$ = this;
    return {
      sprite: "megaman/5",
      size: v3(4, 4, 0),
      collide: function(it){
        if (it.solid) {
          return this$.destroy();
        }
      }
    };
  });
}).call(this);

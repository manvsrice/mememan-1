require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  var this$ = this;
  global.big_health = mixin(object, function(){
    return {
      type: "big_health",
      sprite: "big_health",
      floats: true,
      solid: false,
      dynamic: false,
      collide: function(it){
        if (it === hero) {
          return hero.heal(12);
        }
      },
      tick: after(this$.tick, this$.sprite = "big_health" + cycle([0, 1], 0.8))
    };
  });
}).call(this);

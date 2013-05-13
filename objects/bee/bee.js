require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.traphouse = mixin(object, function(){
    var this$ = this;
    return {
      type: "traphouse",
      sprite: "traphosue",
      floats: true,
      collides: false,
      solid: true,
      size: v3(2 * B, B, 0),
      hp: 999,
      dmg: 0,
      exhausted: just(false),
      tick: after(this.tick, function(dt){
        if (abs(hero.pos.x - this$.pos.x) < B) {
          shot({
            pos: pos.clone().add(v3(0, -B * 2, 0)),
            vel: v3(0, 0, 4 * B)
          });
          return this$.exhausted = true_for(1);
        }
      })
    };
  });
}).call(this);

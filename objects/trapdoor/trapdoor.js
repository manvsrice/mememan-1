require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.trapdoor = mixin(object, function(){
    var this$ = this;
    defer(function(){
      return this$.pos.x += 0.5 * B;
    });
    return {
      type: "trapdoor",
      sprite: "trapdoor",
      floats: true,
      collides: false,
      solid: true,
      size: v3(2 * B, B, 0),
      hp: 999,
      dmg: 0,
      exhausted: just(false),
      tick: after(this.tick, function(dt){
        if (abs(hero.pos.x - this$.pos.x) < B && !this$.exhausted()) {
          trapbite({
            pos: this$.pos.clone()
          });
          return this$.exhausted = true_for(1);
        }
      })
    };
  });
}).call(this);

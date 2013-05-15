require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.macer = mixin(object, function(){
    var this$ = this;
    return {
      type: "macer",
      sprite: "standing0",
      floats: false,
      size: v3(24, 24, 0),
      hp: 8,
      dmg: 4,
      tick: after(this.tick, function(dt){
        this$.dir = hero.pos.x > this$.pos.x
          ? 1
          : -1;
        this$.sprite = "standing" + cycle([0, 1, 2, 3], 0.5);
        if (Math.random() < 0.02) {
          return this$.shot(shot, {
            dmg: 2,
            pos: v3(this$.pos.x + B * this$.dir, this$.pos.y, 0),
            vel: v3(22 * B * this$.dir, 0, 0)
          });
        }
      })
    };
  });
}).call(this);

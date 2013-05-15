require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.trapbite = mixin(object, function(){
    var this$ = this;
    return {
      type: "trapbite",
      sprite: "open",
      life_time: chronometer(),
      tick: after(this.tick, function(){
        if (this$.life_time() > 0.1) {
          this$.sprite = "closed";
        }
        if (this$.life_time() > 0.2) {
          return this$.destroy();
        }
      }),
      vel: v3(0, -8 * B, 0),
      size: v3(12, 10, 0),
      floats: true,
      ghost: true,
      collides: true,
      depth: 1,
      hp: 12,
      dmg: 3
    };
  });
}).call(this);

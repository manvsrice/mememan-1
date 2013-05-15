require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.punch = mixin(object, function(){
    var ref$, this$ = this;
    return {
      type: "punch",
      sprite: "punch",
      tick: after(this.tick, function(){
        if (this$.age() > 1.1) {
          this$.vel = this$.dir_to(this$.owner.pos).multiplyScalar(8 * B);
          if (abs(this$.pos.x - this$.owner.pos.x) < 8) {
            this$.destroy();
          }
        }
        if (this$.age() > 8) {
          this$.destroy();
        }
        return this$.dir = signum(this$.vel.x);
      }),
      side: (ref$ = this.side) != null ? ref$ : "bad",
      size: v3(6, 6, 0),
      floats: true,
      hp: 5,
      dmg: (ref$ = this.dmg) != null ? ref$ : 3
    };
  });
}).call(this);

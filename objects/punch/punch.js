require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.punch = mixin(object, function(){
    var ref$, this$ = this;
    return {
      type: "punch",
      sprite: "punch",
      tick: after(this.tick, function(){
        if (this$.age() > 1.6) {
          this$.vel = this$.dir_to(this$.owner.pos).multiplyScalar(8 * B);
          if (abs(this$.pos.x - this$.owner.pos.x) < B) {
            this$.destroy();
          }
        }
        if (this$.age() > 5) {
          this$.destroy();
        }
        return this$.dir = signum(this$.vel.x);
      }),
      is_shot: true,
      side: (ref$ = this.side) != null ? ref$ : "bad",
      size: v3(6, 6, 0),
      floats: true,
      collide: function(it){
        if (!it.is_shot && it.side !== this$.side) {
          this$.hp = 0;
        }
        return log(this$.hp);
      },
      hp: 4,
      dmg: (ref$ = this.dmg) != null ? ref$ : 3
    };
  });
}).call(this);

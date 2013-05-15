require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.shot = mixin(object, function(){
    var ref$, this$ = this;
    return {
      type: "shot",
      sprite: "shot",
      tick: after(this.tick, function(){
        if (this$.age() > 1.2) {
          return this$.destroy();
        }
      }),
      is_shot: true,
      side: (ref$ = this.side) != null ? ref$ : "bad",
      size: v3(4, 4, 0),
      floats: true,
      collide: function(it){
        if (!it.is_shot && it.side !== this$.side) {
          return this$.hp = 0;
        }
      },
      hp: 1,
      dmg: (ref$ = this.dmg) != null ? ref$ : 2
    };
  });
}).call(this);

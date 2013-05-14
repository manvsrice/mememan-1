require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.shot = mixin(object, function(){
    var ref$, this$ = this;
    return {
      type: "shot",
      tick: after(this.tick, function(){
        if (time_since(this$.created) > 1.2) {
          return this$.destroy();
        }
      }),
      created: now(),
      sprite: "shot",
      side: (ref$ = this.side) != null ? ref$ : "bad",
      size: v3(4, 4, 0),
      floats: true,
      shot: true,
      collide: function(it){
        if (!it.shot) {
          return this$.hp = 0;
        }
      },
      hp: 1,
      dmg: (ref$ = this.dmg) != null ? ref$ : 2
    };
  });
}).call(this);

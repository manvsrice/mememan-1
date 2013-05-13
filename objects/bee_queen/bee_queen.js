require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.bee_queen = mixin(object, function(){
    var this$ = this;
    return {
      type: "bee_queen",
      sprite: "holding",
      floats: true,
      collides: true,
      deploy_x: void 8,
      size: v3(24, 24, 0),
      hp: 32,
      dmg: 4,
      state_time: chronometer(),
      state: "waiting_hero",
      tick: after(this.tick, function(dt){
        switch (this$.state) {
        case 'waiting_hero':
          if (global.hero != null) {
            this$.deploy_x = global.hero.pos.x + 8 * B;
            return this$.state = "positioning";
          }
          break;
        case 'positioning':
          this$.sprite = "holding";
          this$.vel.x = signum(this$.deploy_x - this$.pos.x) * 8 * B;
          this$.dir = signum(this$.vel.x);
          if (abs(this$.deploy_x - this$.pos.x) < 4) {
            this$.state = "laying";
            setTimeout(function(){
              return this$.destroy();
            }, 2500);
          }
          return this$.state_time = chronometer();
        case 'laying':
          this$.sprite = "holding";
          this$.vel.x = 0;
          if (this$.state_time() > 1.5) {
            this$.state = "layed";
            bee({
              pos: v3(this$.pos.x, this$.pos.y, 0)
            });
            bee({
              pos: v3(this$.pos.x - B, this$.pos.y, 0)
            });
            bee({
              pos: v3(this$.pos.x + B, this$.pos.y, 0)
            });
            bee({
              pos: v3(this$.pos.x, this$.pos.y - B, 0)
            });
            bee({
              pos: v3(this$.pos.x, this$.pos.y + B, 0)
            });
            this$.state_time = chronometer();
          }
          return this$.dir = -1;
        case 'layed':
          this$.sprite = "free";
          if (this$.state_time > 1.5) {
            return this$.destroy();
          }
        }
      })
    };
  });
}).call(this);

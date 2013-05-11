require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  var key;
  key = require('key');
  global.cycle = function(arr, interval){
    return arr[floor((now() % interval) / interval * arr.length)];
  };
  global.mememan = mixin(thing, function(){
    var this$ = this;
    key.press('j', function(){
      if (this$.is_sliding()) {
        return;
      }
      if (this$.is_grounded() && key.down('s')) {
        return this$.is_sliding = true_for(0.35);
      } else {
        if (this$.is_grounded()) {
          return this$.vel.y = -VI;
        }
      }
    });
    key.press('k', function(){
      shot({}, {
        pos: v3(this$.pos.x + B * this$.dir, this$.pos.y, 0),
        vel: v3(18 * B * this$.dir, 0, 0)
      });
      return this$.is_shooting = true_for(0.3);
    });
    key.release('j', function(){
      if (this$.vel.y < 0) {
        return this$.vel.y = 0;
      }
    });
    return {
      sprite: "mememan/standing0",
      nome: "meme",
      is_sliding: just(false),
      is_shooting: just(false),
      is_stopped: function(){
        return this$.vel.x === 0 && this$.vel.y === 0;
      },
      floats: false,
      pos: v3(150, 100, 0),
      size: v3(22, 25, 0),
      vel: v3(0, 0, 0),
      tick: after(this.tick, function(){
        this$.vel.x = (function(){
          switch (false) {
          case !this.is_sliding():
            return this.dir * 12 * B;
          case !key.down('d'):
            return B * 4.4;
          case !key.down('a'):
            return -B * 4.4;
          default:
            return 0;
          }
        }.call(this$));
        if (this$.vel.x > 0) {
          this$.dir = 1;
        }
        if (this$.vel.x < 0) {
          this$.dir = -1;
        }
        this$.sprite = this$.is_grounded()
          ? this$.is_stopped()
            ? this$.is_shooting()
              ? "mememan/standing_shoot"
              : "mememan/standing" + cycle([0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 5)
            : this$.is_shooting()
              ? "mememan/walking_shoot" + cycle([0, 1, 2, 1], 0.5)
              : this$.is_sliding()
                ? "mememan/sliding"
                : "mememan/walking" + cycle([0, 1, 2, 1], 0.5)
          : this$.is_shooting() ? "mememan/jumping_shoot" : "mememan/jumping";
        if (this$.dir === 1) {
          return this$.sprite += '_r';
        }
      })
    };
  });
}).call(this);

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
    global.hero = this;
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
      if (this$.is_walking() || this$.is_jumping()) {
        shot({}, {
          pos: v3(this$.pos.x + B * this$.dir, this$.pos.y, 0),
          vel: v3(22 * B * this$.dir, 0, 0)
        });
        return this$.is_shooting = true_for(0.3);
      }
    });
    key.release('j', function(){
      if (this$.is_jumping()) {
        return this$.vel.y = 0;
      }
    });
    return {
      sprite: "mememan/standing0",
      nome: "meme",
      is_sliding: just(false),
      is_shooting: just(false),
      is_climbing: just(false),
      just_climbed: just(false),
      is_jumping: function(){
        return this$.vel.y < 0 && !this$.is_climbing();
      },
      is_walking: function(){
        return !this$.is_jumping() && !this$.is_climbing() && !this$.is_shooting();
      },
      is_stopped: function(){
        return this$.vel.x === 0 && this$.vel.y === 0;
      },
      floats: false,
      collides: true,
      hp: 28,
      size: v3(22, 25, 0),
      vel: v3(0, 0, 0),
      climb: function(dir){
        this$.is_climbing = just(true);
        this$.just_climbed = true_for(0.4);
        this$.ghost = true;
        this$.floats = true;
        this$.pos.x = floor((this$.pos.x + B / 2) / B) * B;
        return this$.vel.y = B * 4.5 * (dir === 'down'
          ? 1
          : -1);
      },
      stop_climbing: function(dir){
        this$.is_climbing = just(false);
        this$.ghost = false;
        return this$.floats = false;
      },
      draw: after(this.draw, function(screen){
        var i$, to$, y, results$ = [];
        screen.fill(0, 0, 0);
        screen.rect(7, 8, 8, 57);
        screen.fill(255, 255, 0);
        for (i$ = 63, to$ = 63 - this$.hp * 2; i$ > to$; i$ -= 2) {
          y = i$;
          results$.push(screen.rect(8, y, 6, 1));
        }
        return results$;
      }),
      tick: after(this.tick, function(){
        this$.vel.x = (function(){
          switch (false) {
          case !this.is_climbing():
            return 0;
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
        this$.vel.y = (function(){
          switch (false) {
          case !!this.is_climbing():
            return this.vel.y;
          case !this.just_climbed():
            return this.vel.y;
          case !key.down('s'):
            return B * 3;
          case !key.down('w'):
            return -B * 3;
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
        if (!this$.is_climbing() && !this$.is_sliding()) {
          if (key.down('s') && has_stair(this$.pos.x, this$.pos.y + B)) {
            this$.climb('down');
          } else if (key.down('w') && has_stair(this$.pos.x, this$.pos.y - B)) {
            this$.climb('up');
          }
        } else if (!this$.just_climbed() && !has_stair(this$.pos.x, this$.pos.y + B / 4)) {
          this$.stop_climbing();
        }
        this$.sprite = this$.is_climbing()
          ? (this$.dir = -1 + floor((this$.pos.y / 16) % 2) * 2, !has_stair(this$.pos.x, this$.pos.y - B / 4) ? "mememan/climbed" : "mememan/climbing")
          : this$.is_grounded()
            ? this$.is_stopped()
              ? this$.is_shooting()
                ? "mememan/standing_shoot"
                : "mememan/standing" + cycle([0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 4)
              : this$.is_shooting()
                ? "mememan/walking_shoot" + cycle([0, 1, 2, 1], 0.5)
                : this$.is_sliding()
                  ? "mememan/sliding"
                  : "mememan/walking" + cycle([0, 1, 2, 1], 0.5)
            : this$.is_shooting() ? "mememan/jumping_shoot" : "mememan/jumping";
        if (this$.dir === 1) {
          this$.sprite += '_r';
        }
        return camera.pos = this$.pos.clone();
      })
    };
  });
}).call(this);

require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  var key;
  key = require('key');
  global.mememan = mixin(object, function(){
    var this$ = this;
    global.hero = this;
    key.press(key_a, function(){
      if (this$.is_sliding()) {
        return;
      }
      if (this$.is_grounded() && key.down('s')) {
        return this$.is_sliding = true_for(0.35);
      } else {
        if (this$.is_grounded()) {
          this$.vel.y = -23 * B;
        }
        if (this$.is_climbing()) {
          return this$.is_climbing = just(false);
        }
      }
    });
    key.press(key_b, function(){
      if (this$.is_walking() || this$.is_jumping() || this$.is_climbing() || this$.is_shooting()) {
        global.play("shoot");
        shot({
          dmg: 2,
          side: this$.side,
          pos: v3(this$.pos.x + B * this$.dir, this$.pos.y, 0),
          vel: v3(22 * B * this$.dir, 0, 0)
        });
        return this$.is_shooting = true_for(0.3);
      }
    });
    key.release(key_a, function(){
      if (this$.is_jumping()) {
        return this$.vel.y = 0;
      }
    });
    return {
      type: "mememan",
      sprite: "standing0",
      floats: false,
      collides: true,
      hp: 28,
      depth: -1,
      size: v3(16, 25, 0),
      vel: v3(0, 0, 0),
      climb: function(dir){
        this$.is_climbing = just(true);
        this$.just_climbed = true_for(0.4);
        this$.ghost = this$.floats = true;
        return this$.vel.y = B * 4.5 * (dir === 'down'
          ? 1
          : -1);
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
      hurt: after(this.hurt, function(){
        if (this$.is_immune()) {
          return;
        }
        play("hurt");
        this$.vel.y += 3 * B;
        this$.just_hurt = true_for(0.5);
        return this$.is_immune = true_for(1.2);
      }),
      tick: after(this.tick, function(dt){
        var stair;
        this$.vel.x = (function(){
          switch (false) {
          case !this.just_hurt():
            return -this.dir * 2 * B;
          case !this.is_climbing():
            return 0;
          case !this.is_sliding():
            return this.dir * 12 * B;
          case !key.down(key_right):
            return B * 4.4;
          case !key.down(key_left):
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
          case !key.down(key_down):
            return B * 3;
          case !key.down(key_up):
            return -B * 3;
          default:
            return 0;
          }
        }.call(this$));
        if (this$.vel.x > 0 && !this$.just_hurt()) {
          this$.dir = 1;
        }
        if (this$.vel.x < 0 && !this$.just_hurt()) {
          this$.dir = -1;
        }
        this$.ghost = this$.floats = this$.is_climbing();
        if (this$.is_climbing()) {
          stair = filter(function(it){
            return it.is_stair;
          }, get_around(this$.pos.x, this$.pos.y))[0];
          if (stair != null) {
            this$.pos.x = stair.pos.x;
          }
        }
        if (this$.is_sliding() && !this$.has_solid_ahead() && this$.vel.y === 0 && this$.has_solid_over()) {
          this$.ghost = this$.floats = true;
          if (key.down('d')) {
            this$.dir = 1;
          }
          if (key.down('a')) {
            this$.dir = -1;
          }
          this$.is_sliding = true_for(0.04);
        }
        if (!this$.is_climbing() && !this$.is_sliding()) {
          if (key.down('s') && has_stair(this$.pos.x, this$.pos.y + B)) {
            this$.climb('down');
          } else if (key.down('w') && has_stair(this$.pos.x, this$.pos.y - B)) {
            this$.climb('up');
          }
        } else if (this$.is_climbing() && !this$.just_climbed() && !has_stair(this$.pos.x, this$.pos.y + B / 4)) {
          this$.is_climbing = just(false);
        }
        return this$.sprite = this$.just_hurt()
          ? "hurt"
          : this$.is_climbing()
            ? (this$.dir = -1 + floor((this$.pos.y / 16) % 2) * 2, this$.is_almost_climbing() ? "climbed" : "climbing")
            : this$.is_sliding()
              ? "sliding"
              : this$.is_grounded()
                ? this$.is_stopped()
                  ? this$.is_shooting()
                    ? "standing_shoot"
                    : "standing" + cycle([0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 4)
                  : this$.is_shooting()
                    ? "walking_shoot" + cycle([0, 1, 2, 1], 0.5)
                    : "walking" + cycle([0, 1, 2, 1], 0.5)
                : this$.is_shooting() ? "jumping_shoot" : "jumping";
      }),
      dir: 1,
      side: "good",
      is_sliding: just(false),
      is_shooting: just(false),
      is_climbing: just(false),
      is_digging: just(false),
      just_hurt: just(false),
      just_climbed: just(false),
      is_almost_climbing: function(){
        return this$.is_climbing() && !has_stair(this$.pos.x, this$.pos.y - B / 4) && has_stair(this$.pos.x, this$.pos.y + B / 4);
      },
      is_jumping: function(){
        return this$.vel.y < 0 && !this$.is_climbing();
      },
      is_walking: function(){
        return !this$.is_jumping() && !this$.is_climbing() && !this$.is_shooting();
      },
      is_stopped: function(){
        return this$.vel.x === 0 && this$.vel.y === 0;
      },
      has_solid_ahead: function(){
        return has_solid(this$.pos.x + this$.dir * B, this$.pos.y);
      },
      has_solid_over: function(){
        return !empty(filter(function(it){
          return it.solid;
        }, tree.get(this$.pos.x - this$.dir * B * 1.1, this$.pos.y - B * 1.5, this$.pos.x + this$.dir * B * 1.1, this$.pos.y - B * 0.5)));
      }
    };
  });
}).call(this);

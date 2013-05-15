require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  var key;
  key = require('key');
  global.hero = mixin(object, function(){
    var this$ = this;
    global.hero = this;
    this.weapons = [
      {
        name: "normal",
        tag: "P",
        shot: function(){
          return this$.shot(shot, {
            dmg: 2,
            side: this$.side,
            vel: v3(22 * 16 * this$.dir, 0, 0)
          });
        }
      }, {
        name: "poke",
        tag: "PM",
        charge: 24,
        cost: 1,
        shot: function(){
          this$.shot(pokeball, {
            pokemon: this$.pokemon,
            dmg: 3,
            vel: v3(12 * 16 * (Number(this$.dir) + Number(key.down(key_right)) - Number(key.down(key_left))), 12 * 16 * (-1 + Number(key.down(key_down)) - Number(key.down(key_up))), 0)
          });
          return this$.pokemon = void 8;
        }
      }, {
        name: "",
        tag: "-"
      }, {
        name: "",
        tag: "-"
      }, {
        name: "",
        tag: "-"
      }
    ];
    return {
      weapon: this.weapons[0],
      type: "hero",
      sprite: "standing0",
      floats: false,
      dynamic: true,
      lives: 3,
      hp: 24,
      maxhp: 24,
      depth: -1,
      size: v3(16, 25, 0),
      vel: v3(0, 0, 0),
      key_a: function(){},
      climb: function(dir){
        this$.is_climbing = just(true);
        this$.just_climbed = true_for(0.4);
        this$.ghost = this$.floats = true;
        return this$.vel.y = 16 * 4.5 * (dir === 'down'
          ? 1
          : -1);
      },
      fire_weapon: function(){
        if (this$.is_walking() || this$.is_jumping() || this$.is_climbing() || this$.is_shooting()) {
          global.play("shoot");
          if (!this$.weapon.cost || this$.weapon.charge >= this$.weapon.cost) {
            this$.weapon.shot();
            if (this$.weapon.charge != null) {
              this$.weapon.charge -= this$.weapon.cost;
            }
          }
          return this$.is_shooting = true_for(0.3);
        }
      },
      stop_jump: function(){
        if (this$.is_jumping()) {
          return this$.vel.y = 0;
        }
      },
      slide: function(){
        if (!this$.is_sliding()) {
          return this$.is_sliding = true_for(0.35);
        }
      },
      jump: function(){
        if (!this$.is_jumping()) {
          if (this$.is_grounded()) {
            this$.vel.y = -23 * 16;
          }
          if (this$.is_climbing()) {
            return this$.is_climbing = just(false);
          }
        }
      },
      hurt: after(this.hurt, function(){
        if (this$.is_immune()) {
          return;
        }
        play("hurt");
        this$.vel.y += 3 * 16;
        this$.just_hurt = true_for(0.5);
        return this$.is_immune = true_for(1.2);
      }),
      pad: v3(0, 0, 0),
      tick: after(this.tick, function(dt){
        var align;
        if (this$.pad.x !== 0) {
          this$.dir = this$.pad.x;
        }
        this$.vel.x = (function(){
          switch (false) {
          case !this.just_hurt():
            return -this.dir * 2 * 16;
          case !this.is_climbing():
            return 0;
          case !this.is_sliding():
            return this.dir * 12 * 16;
          case !key.down(key_right):
            return 16 * 4.4;
          case !key.down(key_left):
            return -16 * 4.4;
          default:
            return 0;
          }
        }.call(this$));
        if (this$.is_climbing()) {
          if (!this$.just_climbed()) {
            this$.vel.y = this$.pad.y * 16 * 3;
          }
          if (this$.pad.x === 0 && !this$.is_shooting()) {
            this$.dir = -1 + floor((this$.pos.y / 16) % 2) * 2;
          }
        }
        this$.ghost = this$.floats = this$.is_climbing();
        if (this$.is_climbing() && (align = filter(function(it){
          return it.is_stair;
        }, get_around(this$.pos.x, this$.pos.y))[0])) {
          this$.pos.x = align.pos.x;
        }
        if (this$.is_sliding() && !this$.has_solid_ahead() && this$.vel.y === 0 && this$.has_solid_over()) {
          this$.ghost = this$.floats = true;
          this$.is_sliding = true_for(0.04);
        }
        if (!this$.is_climbing() && !this$.is_sliding()) {
          if (key.down(key_down) && has_stair(this$.pos.x, this$.pos.y + 16)) {
            this$.climb('down');
          } else if (key.down(key_up) && has_stair(this$.pos.x, this$.pos.y - 16)) {
            this$.climb('up');
          }
        } else if (this$.is_climbing() && !this$.just_climbed() && !has_stair(this$.pos.x, this$.pos.y + 16 / 4)) {
          this$.is_climbing = just(false);
        }
        this$.sprite = (function(){
          switch (false) {
          case !this.just_hurt():
            return "hurt";
          case !this.is_climbing():
            if (this.is_almost_climbing()) {
              return "climbed";
            } else {
              return "climbing" + (this.is_shooting() ? "_shooting" : "");
            }
            break;
          case !this.is_sliding():
            return "sliding";
          case !this.is_standing():
            if (this.is_shooting()) {
              return "standing_shoot";
            } else {
              return "standing" + cycle([0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 4);
            }
            break;
          case !this.is_grounded():
            return (this.is_shooting() ? "walking_shoot" : "walking") + cycle([0, 1, 2, 1], 0.5);
          default:
            if (this.is_shooting()) {
              return "jumping_shoot";
            } else {
              return "jumping";
            }
          }
        }.call(this$));
        return this$.sprite = this$.weapon.name + "/" + this$.sprite;
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
        return this$.is_climbing() && !has_stair(this$.pos.x, this$.pos.y - 16 / 4) && has_stair(this$.pos.x, this$.pos.y + 16 / 4);
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
      is_standing: function(){
        return this$.is_grounded() && this$.is_stopped();
      },
      has_solid_ahead: function(){
        return has_solid(this$.pos.x + this$.dir * 16, this$.pos.y);
      },
      has_solid_over: function(){
        return !empty(filter(function(it){
          return it.solid;
        }, tree.get(this$.pos.x - this$.dir * 16 * 1.1, this$.pos.y - 16 * 1.5, this$.pos.x + this$.dir * 16 * 1.1, this$.pos.y - 16 * 0.5)));
      }
    };
  })();
}).call(this);

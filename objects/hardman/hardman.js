require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.hardman = mixin(object, function(){
    var this$ = this;
    return {
      type: "hardman",
      sprite: "holding",
      deploy_x: void 8,
      size: v3(26, 36, 0),
      hp: 200,
      maxhp: 200,
      dmg: 12,
      state_time: chronometer(),
      state: 'standing',
      exhausted: just(false),
      set_state: function(it){
        this$.state = it;
        return this$.state_time = chronometer();
      },
      draw: after(this.draw, function(){
        return draw_healthbar(this$.hp / this$.maxhp, 30, 8, "down", [255, 0, 0]);
      }),
      tick: after(this.tick, function(dt){
        var rnd;
        this$.dir = signum(hero.pos.x - this$.pos.x);
        if (this$.hp <= 0) {
          enabled_weapons.push('punch');
          stage_select_mode();
        }
        switch (this$.state) {
        case 'standing':
          this$.sprite = "standing" + cycle([0, 1, 2], 0.6);
          rnd = Math.random();
          if (this$.state_time() > 0.8) {
            if ((rnd -= 0.08) < 0) {
              return this$.set_state('shooting');
            } else if ((rnd -= 0.04) < 0) {
              return this$.set_state('soaring');
            }
          }
          break;
        case 'shooting':
          this$.sprite = "shooting" + cycle([0, 1, 2, 3, 4], 0.6);
          if (!this$.exhausted()) {
            this$.shot(punch, {
              vel: this$.dir_to(hero.pos).multiplyScalar(12 * B)
            });
            this$.exhausted = true_for(1.2);
          }
          if (Math.random() < 0.005 || this$.state_time() > 4) {
            return this$.set_state('standing');
          }
          break;
        case 'soaring':
          this$.sprite = "soaring";
          this$.vel.y = -26 * B;
          if (has_solid(this$.pos.x, this$.pos.y - 24) || has_solid(this$.pos.x - 24, this$.pos.y - 24)) {
            this$.vel.y = 0;
          }
          this$.vel.x = signum(hero.pos.x - this$.pos.x) * 168;
          if (abs(this$.pos.x - hero.pos.x) < B / 2) {
            return this$.set_state('turning');
          }
          break;
        case 'turning':
          this$.vel.x = 0;
          if (this$.state_time() < 0.15) {
            this$.vel.y = 0;
            return this$.sprite = "turning0";
          } else if (this$.state_time() < 0.3) {
            this$.vel.y = 0;
            return this$.sprite = "turning1";
          } else {
            this$.vel.y = 36 * 8;
            return this$.set_state('diving');
          }
          break;
        case 'diving':
          this$.sprite = "diving";
          if (this$.is_grounded()) {
            this$.set_state('buried');
            if (hero.is_grounded()) {
              log(hero.vel.y);
              hero.vel.y -= 12 * B;
              hero.pos.y -= 6;
              setTimeout(function(){
                return hero.hurt(6);
              }, 100);
            }
            return camera.pos.y -= 16;
          }
          break;
        case 'buried':
          if (this$.state_time() < 0.6) {
            return this$.sprite = "buried0";
          } else if (this$.state_time() < 2.4) {
            return this$.sprite = "buried1";
          } else {
            return this$.set_state("standing");
          }
        }
      })
    };
  });
}).call(this);

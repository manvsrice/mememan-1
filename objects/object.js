require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  var quadtree;
  quadtree = require('quadtree');
  global.objects = [];
  global.tree = quadtree({
    width: 128,
    height: 128
  });
  global.get_around = function(x, y){
    return tree.get(x - B / 2, y - B / 2, x + B / 2, y + B / 2);
  };
  global.has_solid = function(x, y){
    return !empty(filter(function(it){
      return it.solid;
    }, get_around(x, y)));
  };
  global.has_stair = function(x, y){
    return !empty(filter(function(it){
      return it.is_stair;
    }, get_around(x, y)));
  };
  global.object = mixin(function(){
    var ref$, this$ = this;
    defer(function(){
      objects.push(this$);
      return tree.add(this$, this$.pos.x, this$.pos.y);
    });
    return {
      dir: void 8,
      size: (ref$ = this.size) != null
        ? ref$
        : v3(B, B, 0),
      pos: (ref$ = this.pos) != null
        ? ref$
        : v3(0, 0, 0),
      vel: (ref$ = this.vel) != null
        ? ref$
        : v3(0, 0, 0),
      hp: (ref$ = this.hp) != null ? ref$ : 28,
      dynamic: true,
      solid: false,
      ghost: false,
      floats: false,
      is_immune: just(false),
      type: "missingty",
      draw: function(screen){
        var spr;
        global.drw++;
        if (this$.is_immune() && now() % 0.2 < 0.1) {
          return;
        }
        if (this$.sprite != null) {
          spr = sprite("objects/" + this$.type + "/sprites/" + this$.sprite + (this$.dir != null && this$.dir === 1 ? "_r" : "") + ".png");
          return screen.image(spr, this$.pos.x - spr.width / 2 + camera.offset.x, this$.pos.y - spr.height / 2 + camera.offset.y);
        } else {
          screen.fill(222, 222, 222);
          return screen.rect(this$.pos.x - this$.size.x / 2, this$.pos.y - this$.size.y / 2, this$.size.x, this$.size.y);
        }
      },
      destroy: function(){
        return defer(function(){
          remove(objects, this$);
          return tree.remove(this$);
        });
      },
      tick: function(dt){
        var near_objects, i$, len$, near;
        if (this$.hp <= 0) {
          return this$.destroy();
        }
        this$.pos.x += this$.vel.x * dt;
        this$.pos.y += this$.vel.y * dt;
        if (!this$.floats) {
          this$.pos.y += 0.5 * G * dt * dt;
          this$.vel.y += G * dt;
        }
        this$.is_grounded = just(false);
        near_objects = tree.get(this$.pos.x - B * 2, this$.pos.y - B * 2, this$.pos.x + B * 2, this$.pos.y + B * 2);
        for (i$ = 0, len$ = near_objects.length; i$ < len$; ++i$) {
          near = near_objects[i$];
          if (near !== this$ && (near.dynamic || near.solid)) {
            this$.check_collision(near);
          }
        }
        if (this$.pos.x !== this$.old_pos.x || this$.pos.y !== this$.old_pos.y) {
          tree.add(this$, this$.pos.x, this$.pos.y);
        }
        this$.old_pos.x = this$.pos.x;
        return this$.old_pos.y = this$.pos.y;
      },
      check_collision: function(b){
        var a, abs, ax, aw, axi, axf, ay, ah, ayi, ayf, bx, bw, bxi, bxf, by, bh, byi, byf, dx, dy, av, avx, avy;
        a = this$;
        abs = Math.abs;
        ax = a.pos.x;
        aw = a.size.x / 2;
        axi = ax - aw;
        axf = ax + aw;
        ay = a.pos.y;
        ah = a.size.y / 2;
        ayi = ay - ah;
        ayf = ay + ah;
        bx = b.pos.x;
        bw = b.size.x / 2;
        bxi = bx - bw;
        bxf = bx + bw;
        by = b.pos.y;
        bh = b.size.y / 2;
        byi = by - bh;
        byf = by + bh;
        dx = abs(bx - ax) - (aw + bw);
        dy = abs(by - ay) - (ah + bh);
        if (dx >= 0 || dy >= 0) {
          return false;
        }
        if (!this$.ghost && b.solid) {
          av = a.vel;
          avx = av.x;
          avy = av.y;
          if (dx > dy) {
            if ((bxi < axi && axi < bxf) && avx <= 0) {
              a.pos.x += bxf - axi;
              a.vel.x = 0;
            }
            if ((bxi < axf && axf < bxf) && avx >= 0) {
              a.pos.x += bxi - axf;
              a.vel.x = 0;
            }
          } else {
            if ((byi < ayi && ayi < byf) && avy <= 0) {
              a.pos.y += -dy;
              a.vel.y = 0;
            }
            if ((byi < ayf && ayf < byf) && avy >= 0) {
              a.pos.y += dy;
              a.vel.y = 0;
              this$.is_grounded = just(true);
            }
          }
        }
        if (typeof a.collide === 'function') {
          a.collide(b);
        }
        return true;
      },
      collide: function(it){
        if (it.dmg != null && it.side !== this$.side && it.dmg > 0) {
          return this$.hurt(it.dmg);
        }
      },
      hurt: function(dmg){
        if (!this$.is_immune()) {
          this$.hp -= dmg;
        }
        if (this$ !== hero) {
          return play("enemy_hit");
        }
      },
      old_pos: v3(0, 0, 0)
    };
  });
}).call(this);

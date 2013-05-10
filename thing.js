require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.things = [];
  global.thing = mixin(function(){
    var this$ = this;
    things.push(this);
    return {
      draw: function(screen){
        screen.fill(this.col[0], this.col[1], this.col[2]);
        return screen.rect(this.pos.x - this.size.x / 2, this.pos.y - this.size.y / 2, this.size.x, this.size.y);
      },
      destroy: function(){
        return defer(function(){
          return things.splice(things.indexOf(this$), 1);
        });
      },
      tick: function(dt){
        this$.pos.x += this$.vel.x * dt;
        this$.pos.y += this$.vel.y * dt;
        if (!this$.floats) {
          this$.pos.y += 0.5 * G * dt * dt;
          this$.vel.y += G * dt;
        }
        this$.grounded = false;
        return each(function(it){
          return this$.check_collision(it);
        }, things);
      },
      check_collision: function(b){
        var a, abs, ax, aw, axi, axf, ay, ah, ayi, ayf, bx, bw, bxi, bxf, by, bh, byi, byf, dx, dy;
        a = this;
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
        if (b.solid) {
          if (dx > dy) {
            if (bxi < axi && axi < bxf) {
              a.pos.x += bxf - axi;
              a.vel.x = 0;
            }
            if (bxi < axf && axf < bxf) {
              a.pos.x += bxi - axf;
              a.vel.x = 0;
            }
          } else {
            if (byi < ayi && ayi < byf) {
              a.pos.y += -dy;
              a.vel.y = 0;
            }
            if (byi < ayf && ayf < byf) {
              a.pos.y += dy;
              a.vel.y = 0;
              this.grounded = true;
            }
          }
        }
        if (typeof a.collide === 'function') {
          a.collide(b);
        }
        return true;
      },
      floats: true,
      solid: false,
      col: [200, 200, 200],
      size: v3(B, B, 0),
      pos: v3(0, 0, 0),
      vel: v3(0, 0, 0)
    };
  });
}).call(this);

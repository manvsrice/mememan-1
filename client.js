if (typeof window == 'undefined' || window === null) {
  require('prelude-ls').installPrelude(global);
} else {
  prelude.installPrelude(window);
}
(function(){
  var viclib, box2d, $, v3, state_machine, level, floor, things, thing, VI, G, character, i$, to$, y, j$, to1$, x, last_time, proc, mememan, this$ = this;
  viclib = require('viclib')();
  box2d = require('box2d');
  $ = require('boxes');
  v3 = require('victhree').v3;
  state_machine = require("./state_machine.js");
  level = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
  log("aff");
  floor = mixin(function(){
    thing(this);
    return {
      wall: true
    };
  });
  things = [];
  thing = mixin(function(){
    var this$ = this;
    things.push(this);
    return {
      draw: function(screen){
        screen.fill(this.col[0], this.col[1], this.col[2]);
        return screen.rect(this.pos.x - this.size.x / 2, this.pos.y - this.size.y / 2, this.size.x, this.size.y);
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
        if (b.wall) {
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
              if (typeof a.land === 'function') {
                a.land();
              }
            }
          }
        }
        if (typeof a.collide === 'function') {
          a.collide(b);
        }
        return true;
      },
      col: [200, 200, 200],
      wall: false,
      tick: function(dt){
        return each(function(it){
          return this$.check_collision(it);
        }, things);
      },
      size: v3(32, 32, 0),
      pos: v3(0, 0, 0),
      vel: v3(0, 0, 0)
    };
  });
  VI = 350;
  G = 700;
  character = mixin(function(){
    var fn, this$ = this;
    compose$([thing, state_machine])(this);
    import$(this, (function(){
      var i$, ref$, len$, results$ = {};
      for (i$ = 0, len$ = (ref$ = ['land', 'move', 'stop', 'stop_jump', 'jump']).length; i$ < len$; ++i$) {
        fn = ref$[i$];
        results$[fn] = fn$;
      }
      return results$;
      function fn$(){}
    }()));
    return {
      pos: v3(400, 200, 0),
      size: v3(32, 48, 0),
      vel: v3(0, 0, 0),
      land: function(){
        return this$.grounded = true;
      },
      tick: function(dt){
        this$.pos.x += this$.vel.x * dt;
        this$.pos.y += this$.vel.y * dt + G * 0.5 * dt * dt;
        this$.vel.y += G * dt;
        this$.grounded = false;
        return each(function(it){
          return this$.check_collision(it);
        }, things);
      },
      walk: function(){
        return this$.vel.x = (function(){
          switch (false) {
          case !key.down('d'):
            return 32 * 5;
          case !key.down('a'):
            return -32 * 5;
          default:
            return 0;
          }
        }());
      },
      states: {
        standing: {
          init: function(){
            return this$.col = [200, 150, 200];
          },
          tick: function(){
            if (key.down('d') || key.down('a')) {
              return this$.setState('walking');
            }
          },
          jump: function(){
            this$.setState('jumping');
            return this$.vel.y = -VI;
          }
        },
        walking: {
          init: function(){
            return this$.col = [150, 200, 150];
          },
          tick: function(){
            this$.walk();
            if (!this$.grounded) {
              this$.setState('jumping');
            }
            if (this$.vel.x === 0) {
              return this$.setState('standing');
            }
          },
          stop: function(){
            return this$.setState('standing');
          },
          jump: function(){
            this$.setState('jumping');
            return this$.vel.y = -VI;
          }
        },
        jumping: {
          init: function(){
            return this$.col = [200, 200, 150];
          },
          stop_jump: function(){
            if (this$.vel.y < 0) {
              return this$.vel.y = 0;
            }
          },
          tick: function(){
            return this$.walk();
          },
          land: function(){
            if (this$.state_secs() > 0.5) {
              return this$.setState('walking');
            }
          }
        }
      }
    };
  });
  key.press('j', function(){
    return mememan.jump();
  });
  key.release('j', function(){
    return mememan.stop_jump();
  });
  floor().pos = v3(50, 50, 0);
  for (i$ = 0, to$ = level.length; i$ < to$; ++i$) {
    y = i$;
    for (j$ = 0, to1$ = level[y].length; j$ < to1$; ++j$) {
      x = j$;
      if (level[y][x] === 1) {
        floor().pos = v3(x * 32, y * 32, 0);
      }
    }
  }
  last_time = Date.now();
  proc = processing(1200, 800, function(){
    var dt, this$ = this;
    this.background(240, 240, 240);
    this.strokeWeight(3);
    dt = (Date.now() - last_time) / 1000;
    each(function(it){
      return it.tick(dt);
    }, things);
    last_time = Date.now();
    return each(function(it){
      return it.draw(this$);
    }, things);
  });
  mememan = character();
  $("body").append(proc);
  function compose$(fs){
    return function(){
      var i, args = arguments;
      for (i = fs.length; i > 0; --i) { args = [fs[i-1].apply(this, args)]; }
      return args[0];
    };
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);

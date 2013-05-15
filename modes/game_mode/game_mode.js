require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.game_mode = mixin(function(){
    var refresh_pad, this$ = this;
    global.mode = this;
    stage.create();
    global.draw_healthbar = function(screen, bars, max, x, y, dir){
      var bar_w, bar_h, w, h, sx, sy, addx, addy, i$, i, results$ = [];
      dir == null && (dir = "down");
      dir = "right";
      switch (dir) {
      case 'down':
        bar_w = 6;
        bar_h = 1;
        w = bar_w + 2;
        h = bar_h * max * 2 + 1;
        sx = x + 1;
        sy = y + h - 2;
        addx = 0;
        addy = -2;
        break;
      case 'right':
        bar_w = 1;
        bar_h = 6;
        w = bar_w * max * 2 + 1;
        h = bar_h + 2;
        sx = x + 1;
        sy = y + 1;
        addx = 2;
        addy = 0;
      }
      screen.fill(0, 0, 0);
      screen.rect(x, y, w, h);
      screen.fill(255, 255, 0);
      for (i$ = 0; i$ < bars; ++i$) {
        i = i$;
        results$.push(screen.rect(sx + i * addx, sy + i * addy, bar_w, bar_h));
      }
      return results$;
    };
    key.press(key_down, function(){
      if (mode === this$) {
        if (this$.paused) {
          return this$.move_cursor(1);
        }
      }
    });
    key.press(key_a, function(){
      if (mode === this$) {
        if (this$.paused) {
          play("pause");
          return this$.paused = false;
        } else {
          if (key.down(key_down)) {
            return hero.slide();
          } else {
            return hero.jump();
          }
        }
      }
    });
    refresh_pad = function(){
      return hero.pad = {
        x: (key.down(key_right) ? 1 : 0) + (key.down(key_left) ? -1 : 0),
        y: (key.down(key_down) ? 1 : 0) + (key.down(key_up) ? -1 : 0)
      };
    };
    each(function(it){
      key.press(it, function(){
        if (mode === this$) {
          return defer(refresh_pad);
        }
      });
      return key.release(it, function(){
        if (mode === this$) {
          return defer(refresh_pad);
        }
      });
    }, [key_right, key_left, key_down, key_up]);
    key.release(key_a, function(){
      if (mode === this$) {
        return hero.stop_jump();
      }
    });
    key.press(key_b, function(){
      if (mode === this$) {
        return hero.fire_weapon();
      }
    });
    key.press(key_up, function(){
      if (mode === this$) {
        if (this$.paused) {
          return this$.move_cursor(-1);
        }
      }
    });
    key.press(key_start, function(){
      if (mode === this$) {
        play("pause");
        return this$.paused = !this$.paused;
      }
    });
    return {
      cursor: 0,
      move_cursor: function(it){
        var ref$;
        if (this$.paused) {
          return this$.cursor = ((this$.cursor + it) % (ref$ = hero.weapons.length) + ref$) % ref$;
        }
      },
      paused: false,
      draw: function(screen){
        var ref$, x, y, X, Y, i$, to$, i, wpn, wpn_x, wpn_y, bg, j$, j, visible_objects, dt, len$, obj, dynamic_objects;
        if (this$.paused) {
          screen.fill(107, 8, 0);
          ref$ = [0, camera.height * 3 / 4, camera.width, camera.height], x = ref$[0], y = ref$[1], X = ref$[2], Y = ref$[3];
          screen.rect(0, camera.height * 3 / 4, camera.width, camera.height * 1 / 4);
          screen.fill(255, 255, 255);
          screen.textFont(courier_new);
          screen.textSize(8);
          screen.text("Paused!", x + 10, y + 10);
          screen.text("Lives: " + hero.lives, X - 44, y + 10);
          screen.text("Stuff: " + 0, X - 44, y + 20);
          for (i$ = 0, to$ = hero.weapons.length; i$ < to$; ++i$) {
            i = i$;
            log(i);
            wpn = hero.weapons[i];
            wpn_x = x + 10 + 80 * floor(i / 3);
            wpn_y = y + 20 + 14 * (i % 3);
            if (this$.cursor !== i || blink(0.5)) {
              draw_healthbar(screen, (ref$ = wpn.charge) != null
                ? ref$
                : hero.hp, 28, wpn_x + 12, wpn_y, "right");
              screen.fill(255, 255, 255);
              screen.text(wpn.tag, wpn_x, wpn_y + 7);
            }
            if (this$.cursor === i) {
              hero.weapon = wpn;
            }
          }
          return;
        }
        screen.background(222, 222, 222);
        bg = stage.background();
        for (i$ = -1; i$ <= 3; ++i$) {
          i = i$;
          for (j$ = -1; j$ <= 3; ++j$) {
            j = j$;
            screen.image(bg, bg.width * i - hero.pos.x % bg.width, bg.height * j);
          }
        }
        visible_objects = camera.visible_objects();
        dt = min(now() - global.last_tick, 0.03);
        camera.tick(dt);
        for (i$ = 0, len$ = visible_objects.length; i$ < len$; ++i$) {
          obj = visible_objects[i$];
          if (obj.dynamic) {
            obj.tick(dt);
          }
        }
        global.last_tick = now();
        dynamic_objects = [];
        for (i$ = 0, len$ = visible_objects.length; i$ < len$; ++i$) {
          obj = visible_objects[i$];
          if (!obj.dynamic) {
            obj.draw(screen);
          } else {
            dynamic_objects.push(obj);
          }
        }
        for (i$ = 0, len$ = dynamic_objects.length; i$ < len$; ++i$) {
          obj = dynamic_objects[i$];
          obj.draw(screen);
        }
        return draw_healthbar(screen, hero.hp, 28, 8, 8, "down");
      }
    };
  });
}).call(this);

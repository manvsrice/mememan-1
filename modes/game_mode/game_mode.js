require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.game_mode = mixin(function(){
    var this$ = this;
    global.mode = this;
    stage.create();
    key.press(key_start, function(){
      if (mode !== this$) {
        return;
      }
      play("pause");
      return this$.paused = !this$.paused;
    });
    return {
      paused: false,
      draw: function(screen){
        var bg, i$, i, j$, j, visible_objects, dt, len$, obj, dynamic_objects, results$ = [];
        if (this$.paused) {
          screen.fill(107, 8, 0);
          screen.rect(0, camera.height * 3 / 4, camera.width, camera.height * 1 / 4);
          return;
        }
        screen.background(222, 222, 222);
        bg = stage.background();
        for (i$ = -4; i$ <= 4; ++i$) {
          i = i$;
          for (j$ = -4; j$ <= 4; ++j$) {
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
          results$.push(obj.draw(screen));
        }
        return results$;
      }
    };
  });
}).call(this);

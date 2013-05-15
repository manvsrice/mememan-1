require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.stage_select_mode = mixin(function(){
    var select, this$ = this;
    global.mode = this;
    bg_music("stage_select");
    this.hero = void 8;
    select = function(){
      var stage_info;
      if (global.mode !== this$) {
        return;
      }
      stage_info = this$.stages["" + this$.cursor.x + this$.cursor.y];
      global.stage = stage_info.stage;
      return game_mode();
    };
    key.press(key_a, select);
    key.press(key_start, select);
    key.press(key_down, function(){
      if (global.mode === this$) {
        return log("af", this$.cursor.y++);
      }
    });
    key.press(key_up, function(){
      if (global.mode === this$) {
        return this$.cursor.y--;
      }
    });
    key.press(key_left, function(){
      if (global.mode === this$) {
        return this$.cursor.x--;
      }
    });
    key.press(key_right, function(){
      if (global.mode === this$) {
        return this$.cursor.x++;
      }
    });
    return {
      stages: {
        "00": {
          name: "sparkman",
          stage: hardstage
        },
        "10": {
          name: "snakeman",
          stage: hardstage
        },
        "20": {
          name: "needleman",
          stage: hardstage
        },
        "01": {
          name: "hardman",
          stage: hardstage
        },
        "11": {
          name: "",
          stage: hardstage
        },
        "21": {
          name: "topman",
          stage: hardstage
        },
        "02": {
          name: "geminiman",
          stage: hardstage
        },
        "12": {
          name: "magnetman",
          stage: hardstage
        },
        "22": {
          name: "shadowman",
          stage: hardstage
        }
      },
      cursor: v3(1, 1, 0),
      cursor_pos: v3(0, 0, 0),
      draw: function(screen){
        var ref$, ref1$, color, i$, x, lresult$, j$, y, results$ = [];
        this$.cursor.x = (ref$ = 0 > (ref1$ = this$.cursor.x) ? 0 : ref1$) < 2 ? ref$ : 2;
        this$.cursor.y = (ref$ = 0 > (ref1$ = this$.cursor.y) ? 0 : ref1$) < 2 ? ref$ : 2;
        this$.pos = v3(camera.width / 2 - title.width / 2, 0);
        this$.cursor_pos = v3(this$.pos.x + 18 + 80 * this$.cursor.x, this$.pos.y + 32 + 64 * this$.cursor.y);
        screen.background(44, 101, 248);
        screen.background(0, 0, 0);
        color = now() % 0.25 < 0.125 ? "red" : "blue";
        screen.image(sprite("modes/stage_select_mode/sprites/background.png"), this$.pos.x, this$.pos.y);
        screen.image(sprite("modes/stage_select_mode/sprites/" + color + "_cursor.png"), this$.cursor_pos.x, this$.cursor_pos.y);
        screen.image(sprite("modes/stage_select_mode/sprites/look_" + this$.cursor.x + this$.cursor.y + ".png"), this$.pos.x + 18 + 10 + 80 * 1, this$.pos.y + 8 + 32 + 64 * 1);
        for (i$ = 0; i$ <= 2; ++i$) {
          x = i$;
          lresult$ = [];
          for (j$ = 0; j$ <= 2; ++j$) {
            y = j$;
            lresult$.push(screen.image(sprite("modes/stage_select_mode/sprites/" + this$.stages["" + x + y].name + ".png"), this$.pos.x + 18 + 10 + 80 * x, this$.pos.y + 8 + 32 + 64 * y));
          }
          results$.push(lresult$);
        }
        return results$;
      }
    };
  });
}).call(this);

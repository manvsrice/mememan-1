require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.title_mode = mixin(function(){
    var this$ = this;
    global.mode = this;
    key.press(key_down, function(){
      if (global.mode === this$) {
        return this$.option = "password";
      }
    });
    key.press(key_up, function(){
      if (global.mode === this$) {
        return this$.option = "gamestart";
      }
    });
    key.press(key_start, function(){
      if (global.mode === this$) {
        return stage_select_mode();
      }
    });
    return {
      draw: function(screen){
        screen.background(0, 0, 0);
        return screen.image(sprite("modes/title_mode/sprites/background.png"), camera.width / 2 - title.width / 2, 0);
      }
    };
  });
}).call(this);

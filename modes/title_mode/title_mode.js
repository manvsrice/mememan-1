require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.title_mode = mixin(function(){
    var preload, i$, ref$, len$, wpn, spr, this$ = this;
    global.mode = this;
    bg_music("title");
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
    log("Loading sprites...");
    preload = map((function(it){
      return "modes/stage_select_mode/sprites/" + it;
    }), ['look_00', 'look_01', 'look_02', 'look_10', 'look_11', 'look_12', 'look_20', 'look_21', 'look_22']);
    for (i$ = 0, len$ = (ref$ = ['normal', 'poke']).length; i$ < len$; ++i$) {
      wpn = ref$[i$];
      preload = preload.concat(map((fn$), ['climbed', 'climbed_shooting', 'climbing', 'hurt', 'jumping', 'jumping_shoot', 'sliding', 'standing_shoot', 'standing0', 'standing1', 'walking_shoot0', 'walking_shoot1', 'walking_shoot2', 'walking0', 'walking1', 'walking2']));
    }
    preload = preload.concat(map((function(it){
      return "objects/trapbite/sprites/" + it;
    }), ['closed', 'open']));
    preload = preload.concat(map((function(it){
      return "objects/trapdoor/sprites/" + it;
    }), ['trapdoor']));
    preload = preload.concat(map((function(it){
      return "objects/ground/sprites/" + it;
    }), ['Bottom0', 'Bottom1', 'BottomLeft', 'BottomRight', 'Center0', 'Center1', 'Center2', 'Center3', 'Left0', 'Left1', 'Right0', 'Right1', 'Top0', 'Top1', 'TopLeft', 'TopRight']));
    preload = preload.concat(map((function(it){
      return "objects/bar/sprites/" + it;
    }), ['bar']));
    preload = preload.concat(map((function(it){
      return "objects/bee/sprites/" + it;
    }), ['bee']));
    preload = preload.concat(map((function(it){
      return "objects/bee/sprites/" + it;
    }), ['free', 'holding']));
    preload = preload.concat(map((function(it){
      return "objects/macer/sprites/" + it;
    }), ['standing0', 'standing1', 'standing2', 'standing3', 'throwing']));
    preload = preload.concat(map((function(it){
      return "objects/macer/sprites/" + it;
    }), ['standing0', 'standing1', 'standing2', 'standing3', 'throwing']));
    preload = preload.concat(map((function(it){
      return "objects/rock/sprites/" + it;
    }), ['rock']));
    preload = preload.concat(map((function(it){
      return "objects/shot/sprites/" + it;
    }), ['shot']));
    preload = preload.concat(map((function(it){
      return "objects/stair/sprites/" + it;
    }), ['stair']));
    preload = preload.concat(map((function(it){
      return "modes/stage_select_mode/sprites/" + it;
    }), ['background', 'look_00', 'look_01', 'look_02', 'look_10', 'look_11', 'look_12', 'look_20', 'look_21', 'look_22', 'geminiman', 'hardman', 'magnetman', 'needleman', 'shadowman', 'snakeman', 'sparkman', 'topman', 'wtfisdisguy']));
    for (i$ = 0, len$ = preload.length; i$ < len$; ++i$) {
      spr = preload[i$];
      sprite(spr + ".png");
      sprite(spr + "_r.png");
    }
    return {
      draw: function(screen){
        screen.background(0, 0, 0);
        global.title = sprite("modes/title_mode/sprites/background.png");
        screen.image(title, camera.width / 2 - title.width / 2, 0);
        screen.fill(255, 255, 255);
        screen.textFont(courier_new);
        screen.textSize(4);
        screen.text("Loading prototype. Press start when the main screen shows up.", 0, 5);
        return screen.text("Keys: A/S/D/W = directions, J = jump/select, K = slide, L = start", 0, 10);
      }
    };
    function fn$(it){
      return "objects/mememan/sprites/" + wpn + "/" + it;
    }
  });
}).call(this);

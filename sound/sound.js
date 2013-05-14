require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  var buzz, names, sounds, res$, i$, len$, name, current_bg_music, this$ = this;
  buzz = require('buzz');
  names = ['1up', 'beam_in', 'dead', 'disappearing_block', 'enemy_hit', 'health', 'hurt', 'land', 'pause', 'power_up', 'shoot', 'shot_blocked', 'title', 'hardman', 'stage_select'];
  res$ = {};
  for (i$ = 0, len$ = names.length; i$ < len$; ++i$) {
    name = names[i$];
    res$[name] = new buzz.sound("sound/" + name, {
      formats: ["wav", "mp3"]
    });
  }
  sounds = res$;
  global.play = function(sound){
    var x$;
    log("playing ", sound);
    x$ = sounds[sound];
    x$.play();
    x$.setTime(0);
    return x$;
  };
  current_bg_music = void 8;
  global.bg_music = function(sound){
    if (current_bg_music != null) {
      current_bg_music.stop();
    }
    current_bg_music = play(sound).loop().setVolume(40);
    return log(current_bg_music);
  };
}).call(this);

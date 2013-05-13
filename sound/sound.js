require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  var buzz, names, sounds, res$, i$, len$, name, this$ = this;
  buzz = require('buzz');
  names = ['1up', 'beam_in', 'dead', 'disappearing_block', 'enemy_hit', 'health', 'hurt', 'land', 'pause', 'power_up', 'shoot', 'shot_blocked'];
  res$ = {};
  for (i$ = 0, len$ = names.length; i$ < len$; ++i$) {
    name = names[i$];
    res$[name] = new buzz.sound("sound/" + name + ".wav");
  }
  sounds = res$;
  global.play = function(sound){
    var x$;
    x$ = sounds[sound];
    x$.play();
    x$.setTime(0);
    return x$;
  };
}).call(this);

require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  var key;
  key = require('key');
  global.mememan = mixin(thing, function(){
    var this$ = this;
    key.press('j', function(){
      return this$.jump();
    });
    key.press('k', function(){
      return this$.shot();
    });
    key.release('j', function(){
      return this$.stop_jump();
    });
    return {
      sprite: "mememan/1",
      nome: "meme",
      floats: false,
      pos: v3(150, 100, 0),
      size: v3(B * 0.7, B, 0),
      vel: v3(0, 0, 0),
      jump: function(){
        if (this$.grounded) {
          return this$.vel.y = -VI;
        }
      },
      stop_jump: function(){
        if (this$.vel.y < 0) {
          return this$.vel.y = 0;
        }
      },
      shot: function(){
        return shot({}, {
          pos: clone$(this$.pos),
          vel: v3(8 * B * this$.dir, 0, 0)
        });
      },
      tick: after(this.tick, function(){
        this$.vel.x = (function(){
          switch (false) {
          case !key.down('d'):
            return B * 2.5;
          case !key.down('a'):
            return -B * 2.5;
          default:
            return 0;
          }
        }());
        if (this$.vel.x > 0) {
          this$.dir = 1;
        }
        if (this$.vel.x < 0) {
          return this$.dir = -1;
        }
      })
    };
  });
  function clone$(it){
    function fun(){} fun.prototype = it;
    return new fun;
  }
}).call(this);

require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.pokeball = mixin(object, function(){
    var this$ = this;
    return {
      type: "pokeball",
      sprite: "pokeball",
      size: v3(8, 8, 0),
      is_shot: true,
      hp: 30,
      locked: false,
      tick: after(this.tick, function(){
        if (this$.age() > 1.2 && this$.pokemon == null) {
          return this$.destroy();
        }
      }),
      collide: function(it){
        var key$;
        if (this$.pokemon != null) {
          if (it === this$.owner) {
            it.pokemon = this$.pokemon;
            return this$.destroy();
          } else if (!this$.locked) {
            (typeof global[key$ = this$.pokemon] === 'function' ? global[key$]({
              pos: this$.pos.clone().add(v3(0, 0, 0)),
              owner: this$.owner
            }) : void 8).side = "good";
            this$.pokemon = void 8;
            return this$.destroy();
          }
        } else if (it.dynamic && !it.is_shot && it !== this$.owner) {
          it.destroy();
          this$.pokemon = it.type;
          this$.locked = true;
          log("captured", this$.pokemon);
          return this$.vel = v3(0, 0, 0);
        }
      }
    };
  });
}).call(this);

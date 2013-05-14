require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.bee = mixin(object, function(){
    var this$ = this;
    return {
      type: "bee",
      sprite: "bee",
      floats: true,
      deploy_x: void 8,
      size: v3(12, 8, 0),
      hp: 2,
      dmg: 3,
      tick: after(this.tick, function(dt){
        this$.vel.add(global.hero.pos.clone().sub(this$.pos).multiplyScalar(0.1));
        return this$.vel.normalize().multiplyScalar(6 * B);
      })
    };
  });
}).call(this);

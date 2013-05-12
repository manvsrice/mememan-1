require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.has_stair = function(x, y){
    var i$, ref$, len$, obj;
    for (i$ = 0, len$ = (ref$ = tree.get(x - B / 2, y - B / 2, x + B / 2, y + B / 2)).length; i$ < len$; ++i$) {
      obj = ref$[i$];
      if (obj.is_stair) {
        return true;
      }
    }
    return false;
  };
  global.stair = mixin(thing, function(){
    return {
      sprite: "stair/stair",
      solid: true,
      floats: true,
      is_stair: true
    };
  });
}).call(this);

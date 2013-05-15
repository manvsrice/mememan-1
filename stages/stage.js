require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.stage = mixin(function(){
    var this$ = this;
    return {
      stage_map: ['................................................', '..........o...o..o....ooo......o...o............', '..........o...o......o.........o...o............', '..........o...o..o..o..........o...o............', '..........o...o..o..o.......o.........o.........', '...........o.o...o...o.......oo.....oo..........', '............o....o....ooo......ooooo............', '................................................', '................................................', '................................................', '................................................', '................................................', '......................M.........................', 'oooooooooooooooooooooooooooooooooooooooooooooooo', 'oooooooooooooooooooooooooooooooooooooooooooooooo', 'oooooooooooooooooooooooooooooooooooooooooooooooo', 'oooooooooooooooooooooooooooooooooooooooooooooooo'],
      music: "hardman",
      objects: {
        o: ground,
        M: hero,
        B: bee_queen,
        X: bar,
        h: stair,
        T: trapdoor,
        m: macer,
        H: stair
      },
      create: function(){
        var stage_map, objects_at, has_at, i$, to$, y, lresult$, j$, to1$, x, lresult1$, k$, ref$, len$, obj, border_type, results$ = [];
        log(this$);
        bg_music(this$.music);
        stage_map = map(function(it){
          return it.split("");
        }, this$.stage_map);
        objects_at = function(x, y){
          var obj, ref$;
          obj = this$.objects[(ref$ = stage_map[y]) != null ? ref$[x] : void 8];
          if (obj != null) {
            return [].concat(obj);
          } else {
            return [];
          }
        };
        has_at = function(type, x, y){
          return in$(type, objects_at(x, y));
        };
        for (i$ = 0, to$ = stage_map.length; i$ < to$; ++i$) {
          y = i$;
          lresult$ = [];
          for (j$ = 0, to1$ = stage_map[y].length; j$ < to1$; ++j$) {
            x = j$;
            lresult1$ = [];
            for (k$ = 0, len$ = (ref$ = objects_at(x, y)).length; k$ < len$; ++k$) {
              obj = ref$[k$];
              border_type = !has_at(obj, x + 1, y) && !has_at(obj, x + 1, y - 1) && !has_at(obj, x, y - 1)
                ? "TopRight"
                : !has_at(obj, x, y - 1) && !has_at(obj, x - 1, y - 1) && !has_at(obj, x - 1, y)
                  ? "TopLeft"
                  : !has_at(obj, x - 1, y) && !has_at(obj, x - 1, y + 1) && !has_at(obj, x, y + 1)
                    ? "BottomLeft"
                    : !has_at(obj, x, y + 1) && !has_at(obj, x + 1, y + 1) && !has_at(obj, x + 1, y)
                      ? "BottomRight"
                      : !has_at(obj, x + 1, y)
                        ? "Right" + y % 2
                        : !has_at(obj, x, y - 1)
                          ? "Top" + (x + 1 + y % 2) % 2
                          : !has_at(obj, x - 1, y)
                            ? "Left" + y % 2
                            : !has_at(obj, x, y + 1)
                              ? "Bottom" + x % 2
                              : "Center" + (x % 2 + y % 2 * 2);
              if (obj === hero) {
                lresult1$.push(hero.pos = v3(x * B, y * B, 0));
              } else {
                lresult1$.push(obj({
                  border_type: border_type
                }, {
                  pos: v3(x * B, y * B, 0)
                }));
              }
            }
            lresult$.push(lresult1$);
          }
          results$.push(lresult$);
        }
        return results$;
      }
    };
  });
  function in$(x, arr){
    var i = -1, l = arr.length >>> 0;
    while (++i < l) if (x === arr[i] && i in arr) return true;
    return false;
  }
}).call(this);

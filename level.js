require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  global.level = mixin(function(){
    var this$ = this;
    return {
      map: ['...................................................................................oooooooooooooooooooooooooooooooooooooooooooo', '..........o...o..o....ooo......o...o...............................................ooooooooooooHooooooooooooooooooooooooooooooo', '..........o...o......o.........o...o...............................................ooooooooooooHooooooooooooooooooooooooooooooo', '..........o...o..o..o..........o...o................................................oooo.......H.......oooooooooooooooooooooooo', '..........o...o..o..o.......o.........o.............................................oooo...............oooooooooooooooooooooooo', '...........o.o...o...o.......oo.....oo...............................................ooo...............oooooooooooooooooooooooo', '............o....o....ooo......ooooo.................................................ooo.*.......M.....oooooooooooooooooooooooo', '......................................................................................oooox.x.x.ooooooHoooooooooooooooooooooooo', '......................................................................................ooooooooooooooooHoooooooooooooooooooooooo', '..........................................................ooooo........oo...............ooooooooooooooHoooooooooooooooooooooooo', '......................................................ooooooooo......oooo...............ooooooooooooooHoooooooooooooooooooooooo', '.......................................oo............ooooooooooooo...oooooo........ooo....ooooooooo....oooooooooooooooooooooooo', '......................................oooo...........oooooooooooooo..oooooox.x.x..oooo.................oooooooooooooooooooooooo', 'ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo', 'ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo', 'ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo', 'ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo'],
      objects: {
        o: ground,
        M: function(a, b){
          return defer(function(){
            return mememan(a, b);
          });
        },
        H: stair
      },
      create: function(){
        var level_map, object_at, i$, to$, y, lresult$, j$, to1$, x, border_type, ref$, results$ = [];
        level_map = map(function(it){
          return it.split("");
        }, this$.map);
        object_at = function(x, y){
          var ref$;
          return this$.objects[(ref$ = level_map[y]) != null ? ref$[x] : void 8];
        };
        for (i$ = 0, to$ = level_map.length; i$ < to$; ++i$) {
          y = i$;
          lresult$ = [];
          for (j$ = 0, to1$ = level_map[y].length; j$ < to1$; ++j$) {
            x = j$;
            border_type = object_at(x + 1, y) == null && object_at(x + 1, y - 1) == null && object_at(x, y - 1) == null
              ? "TopRight"
              : object_at(x, y - 1) == null && object_at(x - 1, y - 1) == null && object_at(x - 1, y) == null
                ? "TopLeft"
                : object_at(x - 1, y) == null && object_at(x - 1, y + 1) == null && object_at(x, y + 1) == null
                  ? "BottomLeft"
                  : object_at(x, y + 1) == null && object_at(x + 1, y + 1) == null && object_at(x + 1, y) == null
                    ? "BottomRight"
                    : object_at(x + 1, y) == null
                      ? "Right" + y % 2
                      : object_at(x, y - 1) == null
                        ? "Top" + (x + 1 + y % 2) % 2
                        : object_at(x - 1, y) == null
                          ? "Left" + y % 2
                          : object_at(x, y + 1) == null
                            ? "Bottom" + x % 2
                            : "Center" + (x % 2 + y % 2 * 2);
            lresult$.push(typeof (ref$ = object_at(x, y)) === 'function' ? ref$({
              border_type: border_type
            }, {
              pos: v3(x * B, y * B, 0)
            }) : void 8);
          }
          results$.push(lresult$);
        }
        return results$;
      }
    };
  });
}).call(this);

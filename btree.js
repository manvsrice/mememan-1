require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  var btree;
  module.exports = btree = mixin(function(){
    var tree, pos_of, bucket, index, projx, projy, ref$, this$ = this;
    tree = {};
    pos_of = {};
    bucket = function(x, y){
      return {
        x: floor(x / this$.width),
        y: floor(y / this$.height)
      };
    };
    index = function(pos){
      return bucket.x + "," + bucket.y;
    };
    projx = function(x){
      return floor(x / this$.width);
    };
    projy = function(y){
      return floor(y / this$.height);
    };
    return {
      width: (ref$ = this.width) != null ? ref$ : 100,
      height: (ref$ = this.height) != null ? ref$ : 100,
      add: function(it, x, y){
        var new_bucket_x, new_bucket_y, new_index, it_pos, it_bucket_x, it_bucket_y, it_index, ref$;
        make_id(it);
        new_bucket_x = projx(x);
        new_bucket_y = projy(y);
        new_index = new_bucket_x + "," + new_bucket_y;
        if ((it_pos = pos_of[it.id]) != null) {
          it_bucket_x = projx(it_pos.x);
          it_bucket_y = projy(it_pos.y);
          it_index = it_bucket_x + "," + it_bucket_y;
          if (it_index === new_index) {
            it_pos.x = x;
            it_pos.y = y;
            return;
          }
          remove(tree[it_index], it);
        }
        tree[new_index] = (ref$ = tree[new_index]) != null
          ? ref$
          : [];
        tree[new_index].push(it);
        return pos_of[it.id] = {
          x: x,
          y: y
        };
      },
      get: function(x, y, X, Y){
        var result, i$, to$, i, j$, to1$, j, index, bucket, k$, len$, it, it_pos, ref$;
        result = [];
        for (i$ = projx(x), to$ = projx(X); i$ <= to$; ++i$) {
          i = i$;
          for (j$ = projy(y), to1$ = projy(Y); j$ <= to1$; ++j$) {
            j = j$;
            index = i + "," + j;
            if ((bucket = tree[index]) != null) {
              for (k$ = 0, len$ = bucket.length; k$ < len$; ++k$) {
                it = bucket[k$];
                it_pos = pos_of[it.id];
                if ((x <= (ref$ = it_pos.x) && ref$ < X) && (y <= (ref$ = it_pos.y) && ref$ < Y)) {
                  result.push(it);
                }
              }
            }
          }
        }
        return result;
      },
      tree: function(){
        return tree;
      }
    };
  });
}).call(this);

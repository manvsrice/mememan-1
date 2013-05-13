require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  var state_machine;
  state_machine = mixin(function(){
    var this$ = this;
    defer(function(){
      var i$, ref$, len$, fn, state, fn$ = curry$(function(x$, y$){
        return x$.concat(y$);
      });
      for (i$ = 0, len$ = (ref$ = fold1(fn$, values(map(keys, this$.states)))).length; i$ < len$; ++i$) {
        fn = ref$[i$];
        if (this$[fn] == null) {
          this$[fn] = fn1$;
        }
      }
      iter(this$, function(fn, key){
        if (typeof fn === 'function') {
          return this$[key] = after(fn, function(){
            var ref$;
            return typeof (ref$ = this$.state)[key] === 'function' ? ref$[key].apply(this$, arguments) : void 8;
          });
        }
      });
      for (i$ = 0, len$ = (ref$ = keys(this$.states)).length; i$ < len$; ++i$) {
        state = ref$[i$];
        return this$.setState(state);
      }
      function fn1$(){}
    });
    return {
      setState: function(state){
        var ref$;
        if ((ref$ = this$.state) != null) {
          if (typeof ref$.destroy === 'function') {
            ref$.destroy();
          }
        }
        this$.state = this$.states[state];
        this$.state_start_time = Date.now();
        this$.state_secs = function(){
          return (Date.now() - this$.state_start_time) / 1000;
        };
        return (ref$ = this$.state) != null ? typeof ref$.init === 'function' ? ref$.init() : void 8 : void 8;
      },
      states: {}
    };
  });
  log(state_machine);
  module.exports = state_machine;
  function curry$(f, bound){
    var context,
    _curry = function(args) {
      return f.length > 1 ? function(){
        var params = args ? args.concat() : [];
        context = bound ? context || this : this;
        return params.push.apply(params, arguments) <
            f.length && arguments.length ?
          _curry.call(context, params) : f.apply(context, params);
      } : f;
    };
    return _curry();
  }
}).call(this);

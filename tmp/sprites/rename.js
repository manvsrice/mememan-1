require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  var fs, i;
  fs = require('fs');
  i = 0;
  log(
  map(function(it){
    return [it, __dirname + "/" + i++];
  })(
  map((function(it){
    return __dirname + "/" + it;
  }))(
  fs.readdirSync(__dirname))));
}).call(this);

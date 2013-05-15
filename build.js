require("prelude-ls").installPrelude(global);
require("viclib")();
(function(){
  var fs, file, exec, count, this$ = this;
  fs = require('fs');
  file = require('file');
  exec = require('child_process').exec;
  log("Building project into index.html, please wait...");
  count = 0;
  file.walk(__dirname, function(a, b, c, d){
    var i$, len$, fname, results$ = [];
    for (i$ = 0, len$ = d.length; i$ < len$; ++i$) {
      fname = d[i$];
      if (fname.indexOf(".ls") !== -1 && fname.indexOf("build") === -1 && fname.indexOf("index") === -1) {
        count++;
        results$.push(exec("node " + __dirname + "/node_modules/makels.js " + fname, fn$));
      }
    }
    return results$;
    function fn$(a, b, c){
      log(b);
      count--;
      if (count === 0) {
        return exec("node " + __dirname + "/node_modules/makels.js " + __dirname + "/index.ls", function(a, b, c){
          return log(b);
        });
      }
    }
  });
}).call(this);

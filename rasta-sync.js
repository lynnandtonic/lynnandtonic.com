var deasync = require('deasync');
var Rasta = require('rasta');

module.exports.createRasta = function(path) {
  var rasta = new Rasta();
  rasta.addDirectory = deasync(rasta.addDirectory);
  rasta.addDirectory(path);
  return rasta;
};

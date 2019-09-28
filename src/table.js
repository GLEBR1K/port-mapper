const { table, getBorderCharacters } = require('table');
const { getService } = require('port-numbers');
require('colors');

const header = [
  '#'.bold, 
  'Port'.bold,
  'Service'.bold,
  'Status'.bold,
  'Desciption'.bold
];

const config = {
  border: getBorderCharacters('norc')
};


module.exports = function(data) {
  if (data.length == 0) {
    return 'Empty list...';
  }

  var result = [header];
  
  data.forEach(function(x, i) {
    var info = getService(x.port) || {};

    result.push([
      i + 1, 
      x.port, 
      info.name,
      (x.status ? ' Open '.bgGreen : ' Closed '.bgRed).black,
      info.description
    ]);
  });

  return table(result, config);
};
const { table, getBorderCharacters } = require('table');
require('colors');

const header = [
  '#'.bold, 
  'Port'.bold, 
  'Status'.bold
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
    result.push([
      i + 1, 
      x.port, 
      (x.status ? ' Open '.bgGreen : ' Closed '.bgRed).black
    ]);
  });

  return table(result, config);
};
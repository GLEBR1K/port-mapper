const progress = require('cli-progress');
const table = require('./table');
require('colors');

const bar = new progress.SingleBar({
  format: 'Processing [' + '{bar}'.green + '] {percentage}% | {value}/{total}',
  fps: 1,
  barsize: 100,
  hideCursor: true
});

module.exports = {
  bar: bar,

  beforeCallback: function(host, ports) {
    console.clear();

    console.log('PORT MAPPER v1.0'.underline.green);
    console.log();

    console.log(`Host:\t${host.green}`);

    if (ports.length > 10) {
      console.log('Ports:\t' + `${ports.slice(0, 10).join(', ')}... (+ ${ports.length - 10})`.green);
    } else {
      console.log(`Ports:\t${ports.join(', ').green}`);
    }
    console.log();

    bar.start(ports.length);
  },

  stepCallback: function(data, i) {
    bar.update(i);
  },

  afterCallback: function(results) {
    bar.stop();
    console.log();

    console.log(table(results));
  }
};
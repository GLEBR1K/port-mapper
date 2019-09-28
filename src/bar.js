const progress = require('cli-progress');

const bar = new progress.SingleBar({
  format: 'Processing [{bar}] {percentage}% | {value}/{total}',
  fps: 1,
  barsize: 100,
  hideCursor: true
});

module.exports = {
  bar: bar,

  beforeCallback: function(ip, ports) {
    console.clear();
    console.log(`Target IP: ${ip}`);
    console.log(`Ports: ${ports.join(', ')}`);
    console.log();

    bar.start(ports.length);
  },

  stepCallback: function(data, i) {
    bar.update(i);
  },

  afterCallback: function() {
    bar.stop();
  }
};
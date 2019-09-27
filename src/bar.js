const progress = require('cli-progress');

const bar = new progress.SingleBar({}, progress.Presets.shades_classic);

module.exports = {
  bar: bar,

  beforeCallback: function(length) {
    console.log(`Processing ${length} entries...`);
    bar.start(length);
  },

  stepCallback: function(data, i) {
    bar.update(i);
  },

  afterCallback: function() {
    bar.stop();
  }
};
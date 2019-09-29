const cmd = require('commander');
const range = require('parse-numeric-range');
const Mapper = require('./src/mapper');
const { beforeCallback, stepCallback, afterCallback } = require('./src/bar');
const table = require('./src/table');

cmd
  .arguments('<host> <ports>')
  .option('-o, --open', 'open only')
  .action(invokeMapper);

cmd.parse(process.argv);

function invokeMapper(host, ports, options) {
  ports = range.parse(ports);

  const mapper = new Mapper(host, ports);

  mapper.invoke(beforeCallback, stepCallback, afterCallback).then(function (results) {
    results = results.filter(function (x) {
      return !options.open || x.status;
    });

    console.log(table(results));
  });
}


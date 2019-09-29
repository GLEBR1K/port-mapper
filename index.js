const cmd = require('commander');
const range = require('parse-numeric-range');
const Mapper = require('./src/mapper');
const package = require('./package.json');

cmd
  .arguments('<host> <ports>')
  .option('-o, --open', 'filter open ports')
  .option('-j, --json', 'json output')
  .action(invokeMapper);

cmd.version(package.version);

cmd.parse(process.argv);

function invokeMapper(host, ports, args) {
  const options = {
    open: args.open,
    silent: args.json
  };
  ports = range.parse(ports);
  const mapper = new Mapper(host, ports);
  mapper.invoke(options).then(function(results) {
    if (args.json) {
      console.log(results);
    }
  });
}

const cmd = require('commander');
const range = require('parse-numeric-range');
const Mapper = require('./src/mapper');
const package = require('./package.json');

cmd
  .arguments('<host> <ports>')
  .option('-o, --open', 'open only')
  .action(invokeMapper);

cmd.version(package.version);

cmd.parse(process.argv);

function invokeMapper(host, ports, options) {
  ports = range.parse(ports);
  const mapper = new Mapper(host, ports);
  mapper.invoke(options);
}

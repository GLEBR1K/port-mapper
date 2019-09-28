const net = require('net');
const Mapper = require('../src/mapper');
const port = 5000;

it(`map open ${port}`, function() {
  const mapper = new Mapper('127.0.0.1', [port]);
  return expect(runServer(port).then(function(server) {
    return mapper.invoke().then(function(results) {
      server.close();
      return results;
    });
  })).resolves.toEqual([{ port: port, status: true}]);
});

it(`map closed ${port}`, function() {
  const mapper = new Mapper('127.0.0.1', [port]);
  return expect(mapper.invoke()).resolves.toEqual([{ port: port, status: false}]);
});

function runServer(port) {
  return new Promise(function(resolve) {
    const server = net.createServer();
    server.listen(port, '127.0.0.1', function() {
      resolve(server);
    });
  });
}
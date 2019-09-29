const Mapper = require('../src/mapper');
const server = require('../utils/server');

const host = '127.0.0.1';
const port = 5000;
const options = { silent: true };

it(`map open ${port}`, function() {
  return expect(server.run(host, port).then(function(serverInfo) {
    const mapper = new Mapper(serverInfo.host, [serverInfo.port]);
    return mapper.invoke(options).then(function(results) {
      serverInfo.server.close();
      return results;
    });
  })).resolves.toEqual([{ port: port, status: true}]);
});

it(`map closed ${port}`, function() {
  const mapper = new Mapper(host, [port]);
  return expect(mapper.invoke(options)).resolves.toEqual([{ port: port, status: false}]);
});

const Mapper = require('../src/mapper');
const server = require('../utils/server');

const localhost = '127.0.0.1';
const desiredPorts = [80, 3000, 5000, 5001];

server
  .run(localhost, desiredPorts)
  .then(function(serverInfo) {
    const mapper = new Mapper(serverInfo.host, [serverInfo.port]);
    mapper.invoke().then(function() {
      serverInfo.server.close();
    });
  });
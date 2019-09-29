
const Mapper = require('../src/mapper');
const server = require('../utils/server');

const localhost = '127.0.0.1';
const desiredPorts = [80, 3000, 5000, 5001];

server
  .run(localhost, desiredPorts)
  .then(function(serverInfo) {
    const mapper = new Mapper(serverInfo.ip, [serverInfo.port]);
    mapper.invoke().then(function(results) {
      console.log(results);
      serverInfo.server.close();
    });
  });
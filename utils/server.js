const net = require('net');
const getPort = require('get-port');

function runServer(host, port) {
  return new Promise(function(resolve) {
    const server = net.createServer();
    server.listen(port, host, function() {
      resolve({
        server: server, 
        ip: host, 
        port: port
      });
    });
  });
}

function run(host, port) {
  return getPort({ host: host, port: port})
    .then(function(availablePort) {
      return runServer(host, availablePort);
    });
}

module.exports = {
  run: run
};
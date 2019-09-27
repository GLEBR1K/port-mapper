const { isIPv4, Socket } = require('net');

module.exports = class Mapper {
  constructor(ip, ports) {
    if (isIPv4(ip)) {
      this.ip = ip;
    } else {
      throw new TypeError(`Invalid IP address: "${ip}".`);
    }

    if (ports instanceof Array) {
      this.ports = ports;
    } else {
      throw new TypeError(`List of target ports should be an array. Currently: ${typeof ports}.`);
    }
  }

  invoke(before, progress, after) {
    const self = this;
    var promise;
    var i = 0;
    var length = self.ports.length;

    if (before instanceof Function) {
      before(length);
    }

    var chain = this.ports.map(function(port) {
      return mapPortAsync(self.ip, port)
        .then(function(result) {
          if (progress instanceof Function) {
            progress(result, ++i, length);
          }
          
          return result;
        });
    });

    promise = Promise.all(chain);

    if (after instanceof Function) {
      promise = promise.then(function(results) { 
        after(results); 
        return results; 
      });
    }

    return promise;
  }
};

function mapPortAsync(ip, port) {
  const s = new Socket();
  return new Promise(function(resolve) {

    s.on('connect', function () {
      s.destroy();
      resolve({ port: port, status: true});
    }).on('error', function () {
      s.destroy(); 
      resolve({ port: port, status: false});
    }).connect(port, ip);
  });
}
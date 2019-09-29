const { isIPv4, Socket } = require('net');
const { beforeCallback, stepCallback, afterCallback } = require('./ui');

const defaults = {
  open: false,
  silent: false
};

module.exports = class Mapper {
  constructor(host, ports) {
    if (isIPv4(host)) {
      this.host = host;
    } else {
      throw new TypeError(`Invalid host IP address: "${host}".`);
    }

    if (ports instanceof Array) {
      this.ports = ports;
    } else {
      throw new TypeError(`List of target ports should be an array. Currently: ${typeof ports}.`);
    }
  }

  invoke(options) {
    const self = this;
    var promise;
    var i = 0;
    var length = self.ports.length;
    options = options || defaults;

    if (!options.silent)
    {
      beforeCallback(this.host, this.ports);
    }

    var chain = this.ports.map(function(port) {
      return mapPortAsync(self.host, port)
        .then(function(result) {
          if (!options.silent)
          {
            stepCallback(result, ++i, length);
          }
          return result;
        });
    });

    promise = Promise.all(chain);

    promise = promise.then(function(results) { 
      results = results.filter(function (x) {
        return !options.open || x.status;
      });

      if (!options.silent)
      {
        afterCallback(results); 
      }
      
      return results; 
    });

    return promise;
  }
};

function mapPortAsync(host, port) {
  const s = new Socket();
  return new Promise(function(resolve) {

    s.on('connect', function () {
      s.destroy();
      resolve({ port: port, status: true});
    }).on('error', function () {
      s.destroy(); 
      resolve({ port: port, status: false});
    }).connect(port, host);
  });
}
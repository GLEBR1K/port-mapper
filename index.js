const Mapper = require('./src/mapper');

var ports = [];
for (let index = 1; index < 1000; index++) {
  ports.push(index);    
}
const m = new Mapper('127.0.0.1', ports);

m.invoke().then(function(results) {
  console.table(results.filter(function(x) { 
    return x.status; 
  }));
});

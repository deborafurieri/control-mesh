const http = require('http').createServer();
const io = require('socket.io')(http);

// P1 - Error client
const error = io.of('/error');
error.on('connection', client => {
  console.log(`Error connected [ID: ${client.id}]`);

  client.on('message', value => {
    console.log('error value', value);
    error.emit('message', value);
  });

});

// P2 - Controller client
const controller = io.of('/controller');
controller.on('connection', client => {
  console.log(`Controller connected [ID: ${client.id}]`);

  client.on('message', value => {
    console.log('controller value', value);
    controller.emit('message', value);
  });

});

//P3 - Plant client
const plant = io.of('/plant');
plant.on('connection', client => {
  console.log(`Plant connected [ID: ${client.id}]`);

  client.on('message', value => {
    console.log('plant value', value);
    plant.emit('message', value);
  });

});

http.listen(3000);

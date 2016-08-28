'use strict';

const app = require('./app');
const port = process.env.PORT || app.get('port');

console.log( `env.port = ${process.env.PORT}`);
console.log( `host = ${app.get('host')}`);

const server = app.listen(port);


server.on('listening', () =>
  console.log(`Feathers application started on ${app.get('host')}:${port}`)
);

const http = require('http');
const app = require('./app');
const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

server.on('listening', () => {
  console.log(`Server started at ${server.address().port}`);
});

server.on('error', (err) => {
  console.log(err.message);
});


server.listen(PORT);

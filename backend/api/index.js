const { createServer } = require('http');
const app = require('../app');
const server = createServer(app);

module.exports = (req, res) => {
  server.emit('request', req, res);
};

const { createServer } = require('http');
const app = require('../app'); // Adjust this path to your app.js
const server = createServer(app);

module.exports = (req, res) => {
  server.emit('request', req, res);
};

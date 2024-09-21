const logger = require('./logger');
const path = require('path');

const requestLogger = (req, res, next) => {
  const startTime = new Date();
  res.on('finish', () => {
    const resTime = new Date() - startTime;
    const code = res.statusCode;
    const log = `${req.method} ${req.path} ${res.statusCode} ` +
    `${res.get('Content-Length')} - ${resTime} ms`;

    if (code >= 200 && code < 300 || code === 304)
      logger.success(log);
    else if (code >= 400)
      logger.error(log);
    else
      logger.info(log);
  });
  next();
};

const unknownEndpoint = (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === 'CastError')
    return res.status(400).json({ error: 'malformatted id' });
  else if (error.name === 'ValidationError')
    return res.status(400).json({ error: error.message });
  next(error);
};

module.exports = { requestLogger, unknownEndpoint, errorHandler };

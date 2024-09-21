const express = require('express');
const cors = require('cors');
const middleware = require('./utils/middleware');
const { openConnection, closeConnection } = require('./utils/dbManager');
const logger = require('./utils/logger');
const shorturlRouter = require('./controllers/shorturls');
const ShortUrl = require('./models/shorturl');
const statsRouter = require('./controllers/stats');

const app = express();

openConnection();
const shutdown = async () => {
  logger.info('\nShutting down the server');
  await closeConnection();
  process.exit(0);
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

app.use(cors());
app.use(express.json());
app.use('/', express.static('./dist'));
app.use(middleware.requestLogger);
app.use('/api/v1/shorturls', shorturlRouter);
app.use('/api/v1/stats', statsRouter);
app.get('/:shortId', (req, res, next) => {
  const shortId = req.params.shortId;

  ShortUrl.findOne({ shortId: shortId })
    .then(shorturl => {
      if (!shorturl)
        return next();
      shorturl.clicks++;
      shorturl.save();
      res.redirect(302, shorturl.fullUrl);
    })
    .catch(err => next(err));
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

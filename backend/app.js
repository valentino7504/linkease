const express = require('express');
const cors = require('cors');
const middleware = require('./utils/middleware');
const { openConnection, closeConnection } = require('./utils/dbManager');
const logger = require('./utils/logger');
const shorturlRouter = require('./controllers/shorturls');
const ShortUrl = require('./models/shorturl');

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
// app.use('/', express.static('../frontend/dist'));
app.use(middleware.requestLogger);

app.get('/', (req, res) => res.send('Welcome to LinkEase'));
app.use('/api/v1/shorturls', shorturlRouter);
app.get('/:shortId', (req, res, next) => {
  const shortId = req.params.shortId;

  ShortUrl.findOne({ shortId: shortId })
    .then(shorturl => {
      if (!shorturl)
        return res.status(404).json({ error: 'unknown endpoint' });
      shorturl.clicks++;
      shorturl.save();
      res.redirect(302, shorturl.fullUrl);
    })
    .catch(err => next(err));
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

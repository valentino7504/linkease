const shorturlRouter = require('express').Router();
const ShortUrl = require('../models/shorturl');
const customAlphabet = require('nanoid').customAlphabet;
const config = require('../utils/config');

const ALLOWED_CHARS = config.ALLOWED_CHARS;
const URL_LEN = parseInt(config.URL_LENGTH) || 8;
const urlGen = customAlphabet(ALLOWED_CHARS, URL_LEN);

shorturlRouter.get('/', (req, res) => {
  ShortUrl.find({})
    .then(shorturls => res.json(shorturls));
});

shorturlRouter.get('/:shortId', (req, res, next) => {
  const id = req.params.shortId;

  ShortUrl.findOne({ shortId: id })
    .then(shorturl => res.json(shorturl))
    .catch(err => next(err));
});

shorturlRouter.post('/', (req, res, next) => {
  const body = req.body;
  const maxRetries = 5;
  let attempts = 0;

  const trySave = (shortId) => {
    const shortUrl = new ShortUrl({
      fullUrl: body.fullUrl,
      shortId: shortId
    });
    shortUrl.save()
      .then(shorturl => res.json(shorturl))
      .catch(err => {
        if (err.code === 11000) {
          if (shortId)
            return res.status(409).json({ error: 'Custom short ID is already in use' });
          else if (attempts < maxRetries) {
            attempts++;
            trySave(urlGen());
          } else {
            return res.status(500).json({ error: 'Failed to generate a unique short ID after many tries' });
          }
        } else {
          next(err);
        }
      });
  };
  trySave(body.shortId);
});

module.exports = shorturlRouter;

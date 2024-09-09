const shorturlRouter = require('express').Router();
const ShortUrl = require('../models/shorturl');

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

  ShortUrl.findOne({ fullUrl: body.fullUrl })
    .then(shorturl => {
      if (shorturl)
        return res.json(shorturl);
      else {
        const shortUrl = new ShortUrl({
          fullUrl: body.fullUrl,
          shortId: body.shortId
        });
        shortUrl.save()
          .then(shorturl => res.json(shorturl))
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
});

module.exports = shorturlRouter;

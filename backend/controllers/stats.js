const ShortUrl = require('../models/shorturl');

/**
 * Router to provide global stats for the frontend page
 * Endpoints: GET '/' returns stats - totalClicks, averageClicks
 * and totalUrls
 */
const statsRouter = require('express').Router();

statsRouter.get('/', (req, res, next) => {
  ShortUrl.find({})
    .then(shorturls => {
      const totalUrls = shorturls.length;
      const totalClicks = shorturls.reduce((sum, url) => sum + url.clicks, 0);
      const stats = {
        totalUrls: totalUrls,
        totalClicks: totalClicks,
        averageClicks: Math.floor(totalClicks / totalUrls)
      };
      res.json(stats);
    })
    .catch(err => next(err));
});

module.exports = statsRouter;

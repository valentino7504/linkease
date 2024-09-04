const mongoose = require('mongoose');
const customAlphabet = require('nanoid').customAlphabet;
const config = require('../utils/config');

const ALLOWED_CHARS = config.ALLOWED_CHARS;
const URL_LEN = parseInt(config.URL_LENGTH) || 8;

const urlGen = customAlphabet(ALLOWED_CHARS, URL_LEN);

const urlSchema = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: true,
    validate:
      [(url) => {
        const re = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,})(\/[^\s]*)?$/;
        return re.test(url);
      },
      'Invalid URL format. The URL must follow the format: https://example.com/path, \
        where http or https is followed by a domain name with at least two characters after \
        the last dot, and an optional path after the domain.'
      ]
  },
  shortId: {
    type: String,
    required: true,
    default: urlGen(),
    unique: true
  },
  clicks: {
    type: Number,
    default: 0
  },
  created: {
    type: Date,
    default: () => new Date()
  },
  expiry: {
    type: Date,
    default: () => {
      const currentDate = new Date();
      const expiry = new Date();
      expiry.setDate(currentDate.getDate() + 30);
      return expiry;
    }
  }
});

urlSchema.set('toJSON', {
  transform: (document, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  }
});

urlSchema.index({ expiry: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('ShortUrl', urlSchema);

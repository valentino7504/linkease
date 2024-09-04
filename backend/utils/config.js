require('dotenv').config();

const DB_URL = process.env.DB_URL;
const ALLOWED_CHARS = process.env.ALLOWED_CHARS;
const URL_LENGTH = process.env.URL_LENGTH;
const PORT = process.env.PORT;

module.exports = {
  DB_URL,
  ALLOWED_CHARS,
  URL_LENGTH,
  PORT
};

const mongoose = require('mongoose');
const logger = require('./logger');
const dbUrl = require('./config').DB_URL;


/**
 * Function to connnect to the database
 * @returns: nothing
 */
const openConnection = () => {
  logger.info('connecting to the database');
  mongoose.connect(dbUrl)
    .then(logger.success('connected to the database'))
    .catch(error => logger.error('error:', error.message));
  mongoose.set('strictQuery', true);
};

/**
 * Function to disconnect from the database
 * @returns: does not return anything
 */
const closeConnection = () => mongoose.connection.close();

module.exports = { openConnection, closeConnection };

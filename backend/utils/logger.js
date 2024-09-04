const info = (...params) => console.log(...params);
const success = (...params) => console.log('\x1b[32m%s\x1b[0m', ...params);
const error = (...params) => console.error('\x1b[31m%s\x1b[0m', ...params);

module.exports = { info, success, error };

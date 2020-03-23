const logger = require("koa-logger");

module.exports = logger((str) => {
  console.info(str.trim());
});

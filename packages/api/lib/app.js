const Koa = require("koa");

const auth = require("./middlewares/auth");
const logger = require("./middlewares/logger");
const message = require("./middlewares/message");
const validator = require("./middlewares/validator");

const app = new Koa();

app.use(logger).use(validator).use(auth).use(message);

module.exports = app;

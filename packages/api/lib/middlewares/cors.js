const cors = require("@koa/cors");

module.exports = cors({ allowMethods: ["GET"] });

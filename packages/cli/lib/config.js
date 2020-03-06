const Conf = require("conf");

module.exports = new Conf({
  projectName: "pigeon",
  defaults: {
    host: "http://localhost:3000"
  }
});

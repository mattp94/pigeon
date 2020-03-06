const { magenta } = require("chalk");
const { port } = require("config");

const app = require("./lib/app");

app.listen(port, () => {
  console.info(`Service is running on ${magenta(port)}:`);
});

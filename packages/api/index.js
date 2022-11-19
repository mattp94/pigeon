const { magenta } = require("chalk");

const app = require("./lib/app");
const { port } = require("./lib/config");

app.listen(port, () => {
  console.info(`Service is running on ${magenta(port)}:`);
});

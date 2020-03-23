const yargs = require("yargs");

const config = require("./config");
const { hide } = require("./utils");

module.exports = yargs
  .usage("$0 --to <to> [--subject <subject>] --message <message>")
  .example('$0 -t 0876543210 -m "Hello world"')
  .example('$0 -t bobby@pigeon.io -s Hello -m "<p>Hello world</p>"')
  .option("to", {
    alias: "t",
    describe: "Recipient",
    type: "string",
    demandOption: true,
  })
  .option("subject", {
    alias: "s",
    describe: "Email subject",
    type: "string",
  })
  .option("message", {
    alias: "m",
    describe: "Message content",
    type: "string",
    demandOption: true,
  })
  .option("host", {
    alias: "h",
    describe: "Server host",
    type: "string",
    default: config.get("host"),
    demandOption: !config.has("host"),
  })
  .option("name", {
    alias: "n",
    describe: "Name",
    type: "string",
    default: config.get("name"),
    demandOption: !config.has("name"),
  })
  .option("password", {
    alias: "p",
    describe: "Password",
    type: "string",
    default: config.get("password"),
    defaultDescription: hide(config.get("password")),
    demandOption: !config.has("password"),
  })
  .option("remember", {
    alias: "r",
    describe: "Remember me",
    type: "boolean",
  })
  .help()
  .locale("en").argv;

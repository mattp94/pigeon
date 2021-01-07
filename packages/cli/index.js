#!/usr/bin/env node

const chalk = require("chalk");

const send = require("./lib/send");

send()
  .then(() => console.log(chalk.green("✔"), "Sent"))
  .catch((err) => {
    console.error(chalk.red("✘"), err.message);
    process.exit(1);
  });

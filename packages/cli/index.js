#!/usr/bin/env node

const chalk = require("chalk");
const figures = require("figures");

const send = require("./lib/send");

send()
  .then(() => console.log(chalk.green(figures.tick), "Sent"))
  .catch((err) => {
    console.error(chalk.red(figures.cross), err.message);
    process.exit(1);
  });

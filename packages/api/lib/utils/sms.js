const { execFile } = require("child_process");
const { promisify } = require("util");
const { default: Queue } = require("p-queue");

const asyncExecFile = promisify(execFile);
const queue = new Queue({ concurrency: 1 });

module.exports = async (to, message) => {
  const args = ["sendsms", "TEXT", to, "-text", message];

  await queue.add(() => asyncExecFile("gammu", args));
};

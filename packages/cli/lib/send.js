const Pigeon = require("@pigeon/sdk");

const config = require("./config");
const {
  host,
  message,
  name,
  password,
  remember,
  subject,
  to
} = require("./options");

module.exports = async () => {
  const pigeon = new Pigeon({
    name,
    password,
    host
  });

  await pigeon.send({
    to,
    subject,
    message
  });

  if (remember) {
    config.set({ host, name, password });
  }
};

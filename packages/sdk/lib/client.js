const fetch = require("cross-fetch");

module.exports = class {
  constructor({ name, password, host = "http://localhost:3000" }) {
    Object.assign(this, { name, password, host });
  }

  async send({ to, subject, message }) {
    const { name, password, host } = this;
    const payload = {};

    if (name) {
      payload.name = name;
    }

    if (password) {
      payload.password = password;
    }

    if (to) {
      payload.to = to;
    }

    if (message) {
      payload.message = message;
    }

    if (subject) {
      payload.subject = subject;
    }

    const params = new URLSearchParams(payload);
    const response = await fetch(`${host}?${params}`);

    if (!response.ok) {
      throw Error(`${response.statusText} (${response.status})`);
    }
  }
};

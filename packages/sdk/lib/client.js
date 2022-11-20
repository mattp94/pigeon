const fetch = require("cross-fetch");

module.exports = class {
  constructor({ name, password, host = "http://localhost:3000" }) {
    Object.assign(this, { name, password, host });
  }

  async send({ to, subject, message }) {
    const { name, password, host } = this;

    if (!name || !password || !to || !message || !host) {
      throw new Error("Missing params (name, password, to, message or host)");
    }

    const payload = { name, password, to, message };

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

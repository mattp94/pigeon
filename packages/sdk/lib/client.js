const ky = require("ky-universal");

module.exports = class {
  constructor({ name, password, host = "http://localhost:3000" }) {
    Object.assign(this, { name, password, host });
  }

  async send({ to, subject, message }) {
    const { name, password, host } = this;

    const searchParams = {
      name,
      password,
      to,
      message
    };

    if (subject) {
      searchParams.subject = subject;
    }

    await ky(host, { searchParams });
  }
};

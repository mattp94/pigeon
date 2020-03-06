const email = require("../utils/email");
const sms = require("../utils/sms");

module.exports = ctx => {
  const { to, subject, message } = ctx.state.data;

  const promise = to.includes("@")
    ? email(to, subject, message)
    : sms(to, message);

  promise.catch(err => ctx.app.emit("error", err, ctx));

  ctx.status = 200;
};

const { users } = require("config");

module.exports = async (ctx, next) => {
  const { name, password } = ctx.state.data;

  const user = users.find(
    user => user.name === name && user.password === password
  );

  if (!user) {
    ctx.throw(401);
  }

  await next();
};

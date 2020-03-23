const schema = require("../utils/schema");

module.exports = async (ctx, next) => {
  const { error, value } = schema.validate(ctx.query, {
    presence: "required",
  });

  if (error) {
    ctx.throw(400);
  }

  ctx.state.data = value;

  await next();
};

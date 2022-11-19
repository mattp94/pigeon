module.exports = {
  gmail: {
    email: process.env.GMAIL_EMAIL,
    name: process.env.GMAIL_NAME,
    password: process.env.GMAIL_PASSWORD,
  },
  port: Number(process.env.PORT || 3000),
};

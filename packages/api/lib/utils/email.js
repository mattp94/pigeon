const nodemailer = require("nodemailer");
const striptags = require("striptags");
const { gmail } = require("config");
const { default: Queue } = require("p-queue");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: gmail.email,
    pass: gmail.password,
  },
});

const queue = new Queue({ concurrency: 1 });

module.exports = async (to, subject, message) => {
  const text = striptags(message);

  await queue.add(() =>
    transporter.sendMail({
      from: `"${gmail.name}" <${gmail.email}>`,
      to,
      subject,
      text,
      html: message,
    })
  );
};

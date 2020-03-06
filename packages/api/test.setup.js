const path = require("path");

process.env.NODE_CONFIG_DIR = path.resolve(__dirname, "config");

jest.mock("child_process", () => {
  const execFileMock = jest
    .fn()
    .mockImplementationOnce((file, args, callback) => {
      callback(new Error("Crash"));
    })
    .mockImplementationOnce((file, args, callback) => {
      callback(null, "Done");
    });

  return {
    execFile: execFileMock
  };
});

jest.mock("nodemailer", () => {
  const sendMailMock = jest
    .fn()
    .mockRejectedValueOnce(new Error("Oops"))
    .mockResolvedValueOnce();

  return {
    createTransport: () => ({ sendMail: sendMailMock }),
    sendMail: sendMailMock
  };
});

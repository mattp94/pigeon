jest.mock("node:child_process", () => {
  const execFileMock = jest
    .fn()
    .mockImplementationOnce((file, args, callback) => {
      callback(new Error("Crash"));
    })
    .mockImplementationOnce((file, args, callback) => {
      callback(null, "Done");
    });

  return {
    execFile: execFileMock,
  };
});

jest.mock("nodemailer", () => {
  const sendMailMock = jest
    .fn()
    .mockRejectedValueOnce(new Error("Oops"))
    .mockResolvedValueOnce();

  return {
    createTransport: () => ({ sendMail: sendMailMock }),
    sendMail: sendMailMock,
  };
});

jest.mock("./users", () => [
  {
    name: "bobby",
    password: "12345",
  },
]);

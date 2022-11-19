const supertest = require("supertest");
const { execFile } = require("node:child_process");
const { sendMail } = require("nodemailer");

const app = require("../lib/app");

let server;
let request;

beforeAll(() => {
  server = app.listen();
  request = supertest(server);
});

afterAll(() => {
  server.close();
});

it("should get a 400 because no parameter has been sent", async () => {
  const response = await request.get("/");

  expect(response.statusCode).toBe(400);
  expect(response.text).toBe("Bad Request");
});

it("should get a 400 because name is missing", async () => {
  const response = await request.get("/").query({
    password: "12345",
    to: "0876543210",
    message: "Hello world",
  });

  expect(response.statusCode).toBe(400);
  expect(response.text).toBe("Bad Request");
});

it("should get a 400 because password is missing", async () => {
  const response = await request.get("/").query({
    name: "bobby",
    to: "0876543210",
    message: "Hello world",
  });

  expect(response.statusCode).toBe(400);
  expect(response.text).toBe("Bad Request");
});

it("should get a 400 because phone is not valid", async () => {
  const response = await request.get("/").query({
    name: "bobby",
    password: "12345",
    to: "1876543210",
    message: "Hello world",
  });

  expect(response.statusCode).toBe(400);
  expect(response.text).toBe("Bad Request");
});

it("should get a 400 because email is not valid", async () => {
  const response = await request.get("/").query({
    name: "bobby",
    password: "12345",
    to: "bobby@pigeon",
    message: "Hello world",
  });

  expect(response.statusCode).toBe(400);
  expect(response.text).toBe("Bad Request");
});

it("should get a 400 because message is missing", async () => {
  const response = await request.get("/").query({
    name: "bobby",
    password: "12345",
    to: "0876543210",
  });

  expect(response.statusCode).toBe(400);
  expect(response.text).toBe("Bad Request");
});

it("should get a 401 because name is incorrect", async () => {
  const response = await request.get("/").query({
    name: "raoul",
    password: "12345",
    to: "0876543210",
    message: "Hello world",
  });

  expect(response.statusCode).toBe(401);
  expect(response.text).toBe("Unauthorized");
});

it("should get a 401 because password is incorrect", async () => {
  const response = await request.get("/").query({
    name: "bobby",
    password: "54321",
    to: "0876543210",
    message: "Hello world",
  });

  expect(response.statusCode).toBe(401);
  expect(response.text).toBe("Unauthorized");
});

it("should get a 202 even though gammu command failed", async () => {
  const response = await request.get("/").query({
    name: "bobby",
    password: "12345",
    to: "0876543210",
    message: " Hello world ",
  });

  expect(response.statusCode).toBe(202);
  expect(response.text).toBe("Accepted");

  expect(execFile).toHaveBeenLastCalledWith(
    "gammu",
    ["sendsms", "TEXT", "0876543210", "-text", "Hello world"],
    expect.any(Function)
  );
});

it("should get a 202 even though nodemailer failed", async () => {
  const response = await request.get("/").query({
    name: "bobby",
    password: "12345",
    to: "bobby@pigeon.io",
    subject: " Hello ",
    message: " <p>Hello world</p> ",
  });

  expect(response.statusCode).toBe(202);
  expect(response.text).toBe("Accepted");

  expect(sendMail).toHaveBeenLastCalledWith({
    from: '"FakeMessenger" <fake.messenger@gmail.com>',
    html: "<p>Hello world</p>",
    subject: "Hello",
    text: "Hello world",
    to: "bobby@pigeon.io",
  });
});

it("should get a 202 and send a sms", async () => {
  const response = await request.get("/").query({
    name: "bobby",
    password: "12345",
    to: "0876543210",
    message: "Bonjour monde",
  });

  expect(response.statusCode).toBe(202);
  expect(response.text).toBe("Accepted");

  expect(execFile).toHaveBeenLastCalledWith(
    "gammu",
    ["sendsms", "TEXT", "0876543210", "-text", "Bonjour monde"],
    expect.any(Function)
  );
});

it("should get a 202 and send an email", async () => {
  const response = await request.get("/").query({
    name: "bobby",
    password: "12345",
    to: "bobby@pigeon.io",
    subject: " Bonjour ",
    message: " <p>Bonjour monde</p> ",
  });

  expect(response.statusCode).toBe(202);
  expect(response.text).toBe("Accepted");

  expect(sendMail).toHaveBeenLastCalledWith({
    from: '"FakeMessenger" <fake.messenger@gmail.com>',
    html: "<p>Bonjour monde</p>",
    subject: "Bonjour",
    text: "Bonjour monde",
    to: "bobby@pigeon.io",
  });
});

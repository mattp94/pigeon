const ky = require("ky-universal");

const Client = require("../lib/client");

it("should throw an error", async () => {
  const client = new Client({
    name: "bobby",
    password: "54321"
  });

  const promise = client.send({
    to: "0876543210",
    message: "Hello world"
  });

  await expect(promise).rejects.toThrowError("Boom");

  expect(ky).toHaveBeenLastCalledWith("http://localhost:3000", {
    searchParams: {
      name: "bobby",
      password: "54321",
      to: "0876543210",
      message: "Hello world"
    }
  });
});

it("should send a sms", async () => {
  const client = new Client({
    name: "bobby",
    password: "12345",
    host: "http://pigeon:3000"
  });

  await client.send({
    to: "0876543210",
    message: "Bonjour monde"
  });

  expect(ky).toHaveBeenLastCalledWith("http://pigeon:3000", {
    searchParams: {
      name: "bobby",
      password: "12345",
      to: "0876543210",
      message: "Bonjour monde"
    }
  });
});

it("should send an email", async () => {
  const client = new Client({
    name: "bobby",
    password: "12345",
    host: "http://pigeon:8080"
  });

  await client.send({
    to: "bobby@pigeon.io",
    subject: "Bonjour",
    message: "<p>Bonjour monde</p>"
  });

  expect(ky).toHaveBeenLastCalledWith("http://pigeon:8080", {
    searchParams: {
      name: "bobby",
      password: "12345",
      to: "bobby@pigeon.io",
      subject: "Bonjour",
      message: "<p>Bonjour monde</p>"
    }
  });
});

const fetch = require("cross-fetch");

const Client = require("../lib/client");

it("should throw an unexpected error", async () => {
  const client = new Client({
    name: "john",
    password: "1a2b3c",
  });

  const promise = client.send({
    to: "0654321234",
    message: "👋",
  });

  await expect(promise).rejects.toThrowError("Boom");

  expect(fetch).toHaveBeenLastCalledWith(
    "http://localhost:3000?name=john&password=1a2b3c&to=0654321234&message=%F0%9F%91%8B"
  );
});

it("should throw an unauthorized error", async () => {
  const client = new Client({
    name: "john",
    password: "1a2b3c",
  });

  const promise = client.send({
    to: "0654321234",
    message: "Hello world",
  });

  await expect(promise).rejects.toThrowError("Unauthorized (401)");

  expect(fetch).toHaveBeenLastCalledWith(
    "http://localhost:3000?name=john&password=1a2b3c&to=0654321234&message=Hello+world"
  );
});

it("should send a sms", async () => {
  const client = new Client({
    host: "http://pigeon:3000",
    name: "john",
    password: "a1b2c3",
  });

  await client.send({
    to: "0654321234",
    message: "Bonjour monde",
  });

  expect(fetch).toHaveBeenLastCalledWith(
    "http://pigeon:3000?name=john&password=a1b2c3&to=0654321234&message=Bonjour+monde"
  );
});

it("should send an email", async () => {
  const client = new Client({
    host: "http://pigeon:8080",
    name: "john",
    password: "a1b2c3",
  });

  await client.send({
    to: "john@pigeon.io",
    subject: "Bonjour",
    message: "<p>Bonjour monde</p>",
  });

  expect(fetch).toHaveBeenLastCalledWith(
    "http://pigeon:8080?name=john&password=a1b2c3&to=john%40pigeon.io&message=%3Cp%3EBonjour+monde%3C%2Fp%3E&subject=Bonjour"
  );
});

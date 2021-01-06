const fetch = require("cross-fetch");

const Client = require("../lib/client");

it("should throw an unexpected error", async () => {
  const client = new Client({
    name: "bobby",
    password: "54321",
  });

  const promise = client.send({
    to: "0876543210",
    message: "👋",
  });

  await expect(promise).rejects.toThrowError("Boom");

  expect(fetch).toHaveBeenLastCalledWith(
    "http://localhost:3000?name=bobby&password=54321&to=0876543210&message=%F0%9F%91%8B"
  );
});

it("should throw an unauthorized error", async () => {
  const client = new Client({
    name: "bobby",
    password: "54321",
  });

  const promise = client.send({
    to: "0876543210",
    message: "Hello world",
  });

  await expect(promise).rejects.toThrowError("Unauthorized (401)");

  expect(fetch).toHaveBeenLastCalledWith(
    "http://localhost:3000?name=bobby&password=54321&to=0876543210&message=Hello+world"
  );
});

it("should send a sms", async () => {
  const client = new Client({
    host: "http://pigeon:3000",
    name: "bobby",
    password: "12345",
  });

  await client.send({
    to: "0876543210",
    message: "Bonjour monde",
  });

  expect(fetch).toHaveBeenLastCalledWith(
    "http://pigeon:3000?name=bobby&password=12345&to=0876543210&message=Bonjour+monde"
  );
});

it("should send an email", async () => {
  const client = new Client({
    host: "http://pigeon:8080",
    name: "bobby",
    password: "12345",
  });

  await client.send({
    to: "bobby@pigeon.io",
    subject: "Bonjour",
    message: "<p>Bonjour monde</p>",
  });

  expect(fetch).toHaveBeenLastCalledWith(
    "http://pigeon:8080?name=bobby&password=12345&to=bobby%40pigeon.io&message=%3Cp%3EBonjour+monde%3C%2Fp%3E&subject=Bonjour"
  );
});

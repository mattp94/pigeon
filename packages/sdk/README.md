# @pigeon/sdk

> A small SDK to send messages with Pigeon 🔧

## Install

```sh
npm install @pigeon/sdk
```

_Not available on the public [npm](https://www.npmjs.com) registry._

## Usage

First, instantiate `Pigeon` by passing your credentials as well as the API url:

```js
const Pigeon = require("@pigeon/sdk");

const pigeon = new Pigeon({
  host: "http://pigeon:3000",
  name: "bobby",
  password: "54321",
});
```

Then, use the instance to send a SMS:

```js
pigeon.send({
  to: "0876543210",
  message: "Hello world",
});
```

As well as an email:

```js
pigeon.send({
  to: "bobby@pigeon.io",
  subject: "Hello",
  message: "<p>Hello world</p>",
});
```

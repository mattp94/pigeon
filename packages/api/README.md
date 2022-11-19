# @pigeon/api

> A simple API to send SMS and email using HTTP 📮

## Requirements

- [Node.js](https://nodejs.org)
- [Gammu](https://wammu.eu/gammu)
- [Gmail](https://www.google.com/gmail/about)

## Getting started

First, build the project:

```sh
npm install
```

Then, make your configuration with these environment variables:

```sh
GMAIL_EMAIL=fake.messenger@gmail.com
GMAIL_NAME=FakeMessenger
GMAIL_PASSWORD=secret
PORT=4000 # default is 3000
```

Insert a new user in `users.json` and run it using:

```sh
npm start
```

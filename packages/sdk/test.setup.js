jest.mock("ky-universal", () => {
  const mock = jest
    .fn()
    .mockRejectedValueOnce(new Error("Boom"))
    .mockResolvedValueOnce()
    .mockResolvedValueOnce();

  return mock;
});

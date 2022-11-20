jest.mock("cross-fetch", () => {
  const mock = jest
    .fn()
    .mockRejectedValueOnce(new Error("Boom"))
    .mockResolvedValueOnce({
      ok: false,
      status: 401,
      statusText: "Unauthorized",
    })
    .mockResolvedValueOnce({ ok: true })
    .mockResolvedValueOnce({ ok: true })
    .mockRejectedValueOnce(new Error("Crash"));

  return mock;
});

import init from "../main";

describe("> TestSuite: index", () => {
  it("should assert hello world", () => {
    expect.assertions(1);
    expect(typeof init).toBe("function");
  });
});

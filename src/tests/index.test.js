import { init } from "../main";

describe("> TestSuite: init", () => {
  it("should assert hello world", () => {
    expect.assertions(1);
    expect(typeof init).toBe("function");
  });
});

import { validatePassword } from "../reducers";

describe("> TestSuite: reducers", () => {
  describe("> Test: validatePassword", () => {
    it("should be function", () => {
      expect.assertions(1);
      expect(typeof validatePassword).toBe("function");
    });

    it("should not add error for lowercase letter on a", () => {
      expect.assertions(1);
      expect(validatePassword("a")).not.toStrictEqual(
        expect.arrayContaining(["Password must contain lower case letter."])
      );
    });

    it("should add error when missing lowercase letter", () => {
      expect.assertions(1);
      expect(validatePassword("A")).not.toStrictEqual(
        expect.arrayContaining(["Password must contain capital letter."])
      );
    });
  });
});

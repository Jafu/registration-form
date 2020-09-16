import { validatePassword } from "../passwordInputControl";

describe("> Test: validatePassword", () => {
  it("should be function", () => {
    expect.assertions(1);
    expect(typeof validatePassword).toBe("function");
  });

  it("should add fullFilled for requirement of lowercase letter on a", () => {
    expect.assertions(1);

    const validationErrors = validatePassword("a");

    expect(
      validationErrors.filter(({ fullFilled }) => fullFilled)
    ).toStrictEqual([
      {
        fullFilled: true,
        elementSelector: ".login__password-requirement-icon-lowercase",
      },
    ]);
  });

  it("should add fullFilled for requirement of uppercase letter on A", () => {
    expect.assertions(1);

    const validationErrors = validatePassword("A");

    expect(
      validationErrors.filter(({ fullFilled }) => fullFilled)
    ).toStrictEqual([
      {
        fullFilled: true,
        elementSelector: ".login__password-requirement-icon-uppercase",
      },
    ]);
  });

  it("should add fullFilled when having number", () => {
    expect.assertions(1);

    const validationErrors = validatePassword("1");

    expect(
      validationErrors.filter(({ fullFilled }) => fullFilled)
    ).toStrictEqual([
      {
        fullFilled: true,
        elementSelector: ".login__password-requirement-icon-number",
      },
    ]);
  });

  it("should add fullfilled when having special character", () => {
    expect.assertions(1);

    const validationErrors = validatePassword("/");

    expect(
      validationErrors.filter(({ fullFilled }) => fullFilled)
    ).toStrictEqual([
      {
        fullFilled: true,
        elementSelector: ".login__password-requirement-icon-special-character",
      },
    ]);
  });

  it("should add fullFilled when having 8 characters", () => {
    expect.assertions(1);

    const validationErrors = validatePassword("AAAAAAAA");

    expect(
      validationErrors.filter(({ fullFilled }) => fullFilled)
    ).toStrictEqual([
      {
        fullFilled: true,
        elementSelector: ".login__password-requirement-icon-uppercase",
      },
      {
        fullFilled: true,
        elementSelector: ".login__password-requirement-icon-length",
      },
    ]);
  });
});

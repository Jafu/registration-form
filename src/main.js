import passwordInputControl from "./passwordInputControl";

export default function init() {
  const password = passwordInputControl();
  password.setupVisibilityToggle();
  password.setupInteractiveValidation();
}

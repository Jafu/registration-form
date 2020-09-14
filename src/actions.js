export const ACTIONS = {
  INIT: "INIT",
  LOGIN_EMAIL_INPUT: "LOGIN_EMAIL_INPUT",
  LOGIN_EMAIL_BLUR: "LOGIN_EMAIL_BLUR",
  PASSWORD_INPUT: "PASSWORD_INPUT",
  PASSWORD_BLUR: "PASSWORD_BLUR",
  TOGGLE_SHOW_PASSWORD: "TOGGLE_SHOW_PASSWORD",
  REGISTER_CLICK: "REGISTER_CLICK",
  TOGGLE_TERMS_OF_SERVICE: "TOGGLE_TERMS_OF_SERVICE",
};

export function createInit() {
  return {
    type: ACTIONS.INIT,
    data: {
      email: "",
      password: "",
      passwordHidden: true,
      validationErrors: [],
      showTermsHint: false,
      termsAreChecked: false,
    },
  };
}

export function createLoginEmailInput(element) {
  return {
    type: ACTIONS.LOGIN_EMAIL_INPUT,
    data: {
      value: element.value,
    },
  };
}

export function createLoginEmailBlur(element) {
  return {
    type: ACTIONS.LOGIN_EMAIL_BLUR,
    data: {
      value: element.value,
    },
  };
}

export function createPasswordInput(element) {
  return {
    type: ACTIONS.PASSWORD_INPUT,
    data: {
      value: element.value,
    },
  };
}

export function createPasswordBlur(element) {
  return {
    type: ACTIONS.PASSWORD_BLUR,
    data: {
      value: element.value,
    },
  };
}

export function createSubmit() {
  return {
    type: ACTIONS.REGISTER_CLICK,
  };
}

export function createToggleShowPassword() {
  return {
    type: ACTIONS.TOGGLE_SHOW_PASSWORD,
  };
}

export function createToggleTermsOfService() {
  return {
    type: ACTIONS.TOGGLE_TERMS_OF_SERVICE,
  };
}

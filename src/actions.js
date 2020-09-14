export const ACTIONS = {
  INIT: "INIT",
  LOGIN_EMAIL_INPUT: "LOGIN_EMAIL_INPUT",
  LOGIN_EMAIL_BLUR: "LOGIN_EMAIL_BLUR",
  PASSWORD_INPUT: "PASSWORD_INPUT",
  PASSWORD_BLUR: "PASSWORD_BLUR",
  TOGGLE_SHOW_PASSWORD: "TOGGLE_SHOW_PASSWORD",
  REGISTER_CLICK: "REGISTER_CLICK",
};

export function createInit() {
  return {
    type: ACTIONS.INIT,
    data: {
      email: "jakob",
      password: "",
      passwordHidden: true,
      validationErrors: [],
      focus: {
        element: "input.login-mail",
        selection: [0, 0],
      },
    },
  };
}

export function createLoginEmailInput(element) {
  return {
    type: ACTIONS.LOGIN_EMAIL_INPUT,
    data: {
      value: element.value,
      focus: getFocus(element),
    },
  };
}

export function createLoginEmailBlur(element, activeElement) {
  return {
    type: ACTIONS.LOGIN_EMAIL_BLUR,
    data: {
      value: element.value,
      focus: getFocus(activeElement, true),
    },
  };
}

export function createPasswordInput(element) {
  return {
    type: ACTIONS.PASSWORD_INPUT,
    data: {
      value: element.value,
      focus: getFocus(element),
    },
  };
}

export function createPasswordBlur(element, activeElement) {
  return {
    type: ACTIONS.PASSWORD_BLUR,
    data: {
      value: element.value,
      focus: getFocus(activeElement, true),
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

function getFocus(element, blur) {
  if (!element || element.classList.length === 0) {
    return undefined;
  }
  const nodeName = element.nodeName.toLowerCase();
  if (typeof element.selectionStart !== "number") {
    return {
      element: `${nodeName}.${[...element.classList].join(".")}`,
    };
  }
  return {
    element: `input.${[...element.classList].join(".")}`,
    selection: blur
      ? [0, element.value.length]
      : [element.selectionStart, element.selectionEnd],
  };
}

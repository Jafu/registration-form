import { ACTIONS } from "./actions";

export default function reduce(state, { type, data }) {
  switch (type) {
    case ACTIONS.INIT:
      return data;
    case ACTIONS.PASSWORD_INPUT:
      return {
        ...state,
        password: data.value,
        focus: data.focus,
        validationErrors: validatePassword(data.value),
      };
    case ACTIONS.PASSWORD_BLUR: {
      const validationErrors = validatePassword(state.password);
      const hasErrors = validationErrors.find(({ fullFilled }) => !fullFilled);
      return {
        ...state,
        focus: data.focus,
        showPasswordHints: hasErrors,
        validationErrors,
      };
    }
    case ACTIONS.TOGGLE_SHOW_PASSWORD:
      return {
        ...state,
        passwordHidden: !state.passwordHidden,
      };
    case ACTIONS.LOGIN_EMAIL_INPUT: {
      return {
        ...state,
        email: data.value,
        focus: data.focus,
      };
    }
    case ACTIONS.LOGIN_EMAIL_BLUR: {
      return {
        ...state,
        email: data.value,
        focus: data.focus,
      };
    }
    case ACTIONS.REGISTER_CLICK: {
      const validationErrors = validatePassword(state.password);
      const hasErrors = validationErrors.find(({ fullFilled }) => !fullFilled);
      return {
        ...state,
        submitNow: !hasErrors,
        showPasswordHints: hasErrors,
        validationErrors,
      };
    }
    default:
      return state;
  }
}

export function validatePassword(password) {
  const validationErrors = [];
  validationErrors.push(
    createPasswordRequirement(/[A-Z]/.test(password), "a capital letter")
  );
  validationErrors.push(
    createPasswordRequirement(/[a-z]/.test(password), "a lower case letter")
  );
  validationErrors.push(
    createPasswordRequirement(/\d/.test(password), "a number")
  );
  validationErrors.push(
    createPasswordRequirement(
      /[^A-Za-z0-9]/.test(password),
      "a special character"
    )
  );
  validationErrors.push(
    createPasswordRequirement(password.length >= 8, "8 characters")
  );
  return validationErrors;
}

function createPasswordRequirement(fullFilled, infoText) {
  return { fullFilled, infoText };
}

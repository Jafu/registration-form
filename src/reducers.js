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
    case ACTIONS.PASSWORD_BLUR:
      return {
        ...state,
        password: data.value,
        focus: data.focus,
        validationErrors: validatePassword(data.value),
      };
    case ACTIONS.LOGIN_EMAIL_INPUT:
      return { ...state, email: data.value, focus: data.focus };
    case ACTIONS.LOGIN_EMAIL_BLUR:
      return { ...state, email: data.value, focus: data.focus };
    case ACTIONS.REGISTER_CLICK: {
      const validationErrors = validatePassword(state.password);
      return {
        ...state,
        submitNow: true,
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
    createPasswordRequirement(
      /[A-Z]/.test(password),
      "Password must contain capital letter."
    )
  );
  validationErrors.push(
    createPasswordRequirement(
      /[a-z]/.test(password),
      "Password must contain lower case letter."
    )
  );
  validationErrors.push(
    createPasswordRequirement(
      /\d/.test(password),
      "Password must contain number."
    )
  );
  validationErrors.push(
    createPasswordRequirement(
      /[^A-Za-z0-9]/.test(password),
      "Password must contain special char."
    )
  );
  validationErrors.push(
    createPasswordRequirement(
      password.length >= 8,
      "Password must be at least 8 characters long."
    )
  );
  return validationErrors;
}

function createPasswordRequirement(fullFilled, infoText) {
  return { fullFilled, infoText };
}

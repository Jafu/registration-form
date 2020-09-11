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
    case ACTIONS.REGISTER_CLICK:
      return { ...state, validationErrors: ["yes"] };
    default:
      return state;
  }
}

export function validatePassword(password) {
  const validationErrors = [];
  if (!/[A-Z]/.test(password)) {
    validationErrors.push("Password must contain capital letter.");
  }
  if (!/[a-z]/.test(password)) {
    validationErrors.push("Password must contain lower case character.");
  }
  if (!/\d/.test(password)) {
    validationErrors.push("Password must contain number.");
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    validationErrors.push("Password must contain special char.");
  }
  if (password.length < 8) {
    validationErrors.push("Password must be 8 characters long.");
  }
  return validationErrors;
}

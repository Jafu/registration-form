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
        validationErrors: validatePassword(state.password),
      };
    case ACTIONS.PASSWORD_BLUR:
      return { ...state, password: data.value, focus: data.focus };
    case ACTIONS.LOGIN_EMAIL_INPUT:
      return { ...state, mail: data.value, focus: data.focus };
    case ACTIONS.LOGIN_EMAIL_BLUR:
      return { ...state, mail: data.value, focus: data.focus };
    case ACTIONS.REGISTER_CLICK:
      return { ...state, validationErrors: ["yes"] };
    default:
      return state;
  }
}

function validatePassword(password) {
  const validationErrors = [];
  if (!/\d/.test(password)) {
    validationErrors.push("Password must contain number.");
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    validationErrors.push("Password must contain special char.");
  }
  return validationErrors;
}

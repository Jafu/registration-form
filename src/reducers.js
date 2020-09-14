import { ACTIONS } from "./actions";

export default function reduce(state, { type, data }) {
  switch (type) {
    case ACTIONS.INIT:
      return data;
    case ACTIONS.PASSWORD_INPUT:
      return {
        ...state,
        password: data.value,
        validationErrors: validatePassword(data.value),
      };
    case ACTIONS.PASSWORD_BLUR: {
      const validationErrors = validatePassword(state.password);
      const hasErrors = validationErrors.find(({ fullFilled }) => !fullFilled);
      return {
        ...state,
        showPasswordHints: hasErrors,
        validationErrors,
      };
    }
    case ACTIONS.TOGGLE_SHOW_PASSWORD:
      return {
        ...state,
        passwordHidden: !state.passwordHidden,
      };
    case ACTIONS.TOGGLE_TERMS_OF_SERVICE: {
      const termsAreChecked = !state.termsAreChecked;
      return {
        ...state,
        showTermsHint: !termsAreChecked,
        termsAreChecked,
      };
    }
    case ACTIONS.LOGIN_EMAIL_INPUT: {
      return {
        ...state,
        email: data.value,
      };
    }
    case ACTIONS.LOGIN_EMAIL_BLUR: {
      const isValid = validateEmail(data.value);
      return {
        ...state,
        email: data.value,
        showEmailHints: !isValid,
      };
    }
    case ACTIONS.REGISTER_CLICK: {
      const isValidEmail = validateEmail(state.email);
      const validationErrors = validatePassword(state.password);
      const hasErrors = validationErrors.find(({ fullFilled }) => !fullFilled);
      return {
        ...state,
        submitNow: !hasErrors && !isValidEmail && state.termsAreChecked,
        showPasswordHints: hasErrors,
        showEmailHints: !isValidEmail,
        showTermsHint: !state.termsAreChecked,
        validationErrors,
      };
    }
    default:
      return state;
  }
}

export function validateEmail(email) {
  // eslint-disable-next-line no-useless-escape
  const emailRegexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const fullFilled = emailRegexp.test(email);
  return fullFilled;
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

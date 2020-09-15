import { createStore } from "redux";

import reduce from "./reducers";
import {
  createInit,
  createLoginEmailBlur,
  createPasswordBlur,
  createLoginEmailInput,
  createPasswordInput,
  createSubmit,
  createToggleShowPassword,
  createToggleTermsOfService,
} from "./actions";
import { loginForm } from "./loginForm";

export function init() {
  const store = createStore(reduce);
  store.subscribe(render.bind(undefined, store));
  store.dispatch(createInit());
  document.getElementById("login__email-input").focus();
}

export default {
  init,
};

function render(store) {
  const mountNode = document.getElementById("app");
  const {
    email,
    password,
    passwordHidden,
    validationErrors,
    showPasswordHints,
    showEmailHints,
    submitNow,
    termsAreChecked,
    showTermsHint,
  } = store.getState();
  if (submitNow) {
    mountNode.querySelector("form").submit();
    return;
  }
  const focus = getFocus(document.activeElement);
  mountNode.innerHTML = loginForm({
    email,
    password,
    passwordHidden,
    validationErrors,
    showPasswordHints,
    showEmailHints,
    termsAreChecked,
    showTermsHint,
  });
  if (focus) {
    document.getElementById(focus.element).focus();
    if (focus.selection) {
      document
        .getElementById(focus.element)
        .setSelectionRange(...focus.selection);
    }
  }

  document.getElementById("login__email-input").oninput = (e) => {
    store.dispatch(createLoginEmailInput(e.target));
  };

  document.getElementById("login__email-input").onblur = (e) => {
    console.log("blur");
    const action = createLoginEmailBlur(e.target);
    setTimeout(() => {
      store.dispatch(action);
    }, 0);
  };

  document.getElementById("login__password-input").oninput = (e) => {
    console.log("input");
    const action = createPasswordInput(e.target);
    store.dispatch(action);
  };

  document.getElementById("login__password-input").onblur = (e) => {
    console.log("blur");
    const action = createPasswordBlur(e.target, e.relatedTarget);
    setTimeout(() => {
      store.dispatch(action);
    }, 0);
  };

  document.getElementById("login__agree-with-terms-check").onchange = () => {
    console.log("check");
    const action = createToggleTermsOfService();
    store.dispatch(action);
  };

  mountNode.querySelector("form").onsubmit = (e) => {
    console.log("submit");
    store.dispatch(createSubmit(e.target));
    e.stopPropagation();
    e.preventDefault();
  };

  document.getElementById("login__show-password-toggle").onclick = (e) => {
    console.log(e);
    store.dispatch(createToggleShowPassword());
    e.stopPropagation();
    e.preventDefault();
  };
}

function getFocus(element) {
  if (!(element && element.id)) {
    return undefined;
  }
  if (typeof element.selectionStart !== "number") {
    return {
      element: element.id,
    };
  }
  return {
    element: element.id,
    selection: [element.selectionStart, element.selectionEnd],
  };
}

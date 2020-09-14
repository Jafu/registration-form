// FIXME classes for icons and input validation hints
// FIXME use ids for interactive login form elements
// FIXME add tests for components w/ flags
// FIXME add tests for register reducer
// FIXME add tests for email input reducer
// FIXME add tests for blur password reducer
// FIXME add tests for blur input reducer
// FIXME group view state and business logic state
// FIXME group password, email, terms data in state object
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
  const mountNode = document.getElementById("app");
  mountNode.querySelector("input.login-mail").focus();
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
    mountNode.querySelector(focus.element).focus();
    if (focus.selection) {
      mountNode
        .querySelector(focus.element)
        .setSelectionRange(...focus.selection);
    }
  }

  mountNode.querySelector("input.login-mail").oninput = (e) => {
    store.dispatch(createLoginEmailInput(e.target));
  };

  mountNode.querySelector("input.login-mail").onblur = (e) => {
    console.log("blur");
    const action = createLoginEmailBlur(e.target);
    setTimeout(() => {
      store.dispatch(action);
    }, 0);
  };

  mountNode.querySelector("input.login-password").oninput = (e) => {
    console.log("input");
    const action = createPasswordInput(e.target);
    store.dispatch(action);
  };

  mountNode.querySelector("input.login-password").onblur = (e) => {
    console.log("blur");
    const action = createPasswordBlur(e.target, e.relatedTarget);
    setTimeout(() => {
      store.dispatch(action);
    }, 0);
  };

  mountNode.querySelector(
    "input.login__agree-with-terms-check"
  ).onchange = () => {
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

  mountNode.querySelector(".login__show-password-toggle").onclick = (e) => {
    console.log(e);
    store.dispatch(createToggleShowPassword());
    e.stopPropagation();
    e.preventDefault();
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

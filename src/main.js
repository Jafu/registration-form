import { createStore } from "redux";

import reduce from "./reducers";
import {
  createInit,
  createLoginEmailBlur,
  createPasswordBlur,
  createLoginEmailInput,
  createPasswordInput,
  createSubmit,
} from "./actions";

export function init() {
  const store = createStore(reduce);
  store.subscribe(render.bind(undefined, store));
  store.dispatch(createInit());
}

export default {
  init,
};

function render(store) {
  const mountNode = document.getElementById("app");
  const {
    focus,
    email,
    password,
    validationErrors,
    showPasswordHints,
    submitNow,
  } = store.getState();
  if (submitNow) {
    mountNode.querySelector("form").submit();
    return;
  }
  mountNode.innerHTML = loginForm({
    email,
    password,
    validationErrors,
    showPasswordHints,
  });
  mountNode.querySelector("input.login-mail").oninput = (e) => {
    store.dispatch(createLoginEmailInput(e.target));
  };
  mountNode.querySelector("input.login-mail").onblur = (e) => {
    store.dispatch(createLoginEmailBlur(e.target, e.relatedTarget));
  };
  mountNode.querySelector("input.login-password").oninput = (e) => {
    store.dispatch(createPasswordInput(e.target));
  };
  mountNode.querySelector("input.login-password").onblur = (e) => {
    store.dispatch(createPasswordBlur(e.target, e.relatedTarget));
  };
  mountNode.querySelector("form").onsubmit = (e) => {
    store.dispatch(createSubmit(e.target, e.relatedTarget));
    e.stopPropagation();
    e.preventDefault();
  };
  if (focus) {
    mountNode.querySelector(focus.element).focus();
    if (focus.selection) {
      mountNode
        .querySelector(focus.element)
        .setSelectionRange(...focus.selection);
    }
  }
}

function loginForm({ email, password, validationErrors, showPasswordHints }) {
  return `<form class="login" action='/register'>
		<h1>Register</h1>
		<p><caption>Create your personal account</caption></p>	
		<p>${inputName(email)}</p>
		<p>${inputPassword(password)}</p>
		${showPasswordHints ? hintsList(validationErrors) : ""}
		<input type="submit" class="login__submit-button" value="Register Now"/>
	</form>`;
}

function hintsList(passwordRequirements) {
  if (passwordRequirements.length === 0) {
    return "";
  }
  return `<ul>
		${passwordRequirements
      .map((requirement) => `<li>${hint(requirement)}</li>`)
      .join("")}
	</ul>`;
}

function hint({ infoText, fullFilled }) {
  const iconFullFilled = fullFilled ? iconDone() : iconUnDone();
  const iconClass = "login__password-requirement-icon";
  const iconFullFilledClass = fullFilled
    ? `${iconClass}--full-filled`
    : `${iconClass}--not-full-filled`;
  return `<div class="${iconClass} ${iconFullFilledClass}">${iconFullFilled}</div> ${infoText}`;
}

function iconDone() {
  return `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" class="login__password-requirement-icon-svg svg-inline--fa fa-check fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>`;
}

function iconUnDone() {
  return `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="login__password-requirement-icon-svg svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>`;
}

function inputName(email) {
  return `<label for="login-mail">Email address</label>
<input id="login-mail" class="login-mail" type="text" value="${email}"/>`;
}

function inputPassword(password) {
  return `<label>Password</label>
<input class="login-password" type="password" value="${password}"/>`;
}

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
} from "./actions";

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
    // focus,
    email,
    password,
    passwordHidden,
    validationErrors,
    showPasswordHints,
    showEmailHints,
    submitNow,
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
    const action = createLoginEmailBlur(e.target, e.relatedTarget);
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

  mountNode.querySelector("form").onsubmit = (e) => {
    console.log("submit");
    store.dispatch(createSubmit(e.target, e.relatedTarget));
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

function loginForm({
  email,
  password,
  passwordHidden,
  validationErrors,
  showPasswordHints,
  showEmailHints,
}) {
  return `<form class="login" action='/register'>
		<h1>Register</h1>
		<p class="login__form-caption">Create your personal account</p>	
		<p>${inputName(email, showEmailHints)}</p>
		<p>${inputPassword(password, passwordHidden, showPasswordHints)}</p>
		${showPasswordHints ? hintsList(validationErrors) : ""}
		<input type="submit" class="login__submit-button" value="Register Now"/>
	</form>`;
}

function hintsList(passwordRequirements) {
  if (passwordRequirements.length === 0) {
    return "";
  }
  return `<section class="login__password-requirements">
	<p>Make sure your password contains at least:</p>
	<ul>
		${passwordRequirements
      .map((requirement) => `<li>${hint(requirement)}</li>`)
      .join("")}
	</ul></section>`;
}

function hint({ infoText, fullFilled }) {
  const iconFullFilled = fullFilled ? iconDone() : iconUnDone();
  const iconClass = "login__password-requirement-icon";
  const iconFullFilledClass = fullFilled
    ? `${iconClass}--full-filled`
    : `${iconClass}--not-full-filled`;
  return `<div class="${iconClass} ${iconFullFilledClass}">${iconFullFilled}</div> ${infoText}`;
}

function inputName(email, showEmailHints) {
  const invalidClass = showEmailHints
    ? "login__email-input--invalid"
    : "login__email-input--valid";
  return `<label class="login__mail-label" for="login-mail">Email address</label>
<input id="login-mail" placeholder="Enter email address" class="login-mail ${invalidClass}" type="text" value="${email}"/>`;
}

function inputPassword(password, passwordHidden = true, showPasswordHints) {
  const iconPasswordHidden = passwordHidden ? iconHidden() : iconShow();
  const inputType = passwordHidden ? "password" : "text";
  const invalidClass = showPasswordHints
    ? "login__password-input--invalid"
    : "login__password-input--valid";
  return `<label class="login__password-label" for="login-password">Password</label>
	<div class="login__password-input-wrapper">
		<input id="login-password" placeholder="Enter password" class="login-password ${invalidClass}" type="${inputType}" value="${password}"/>
		<div class="login__show-password-toggle" title="toggle password visibility">${iconPasswordHidden}</div>
	</div>`;
}

function iconHidden() {
  return `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye" class="login__show-password-icon svg-inline--fa fa-eye fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path></svg>`;
}

function iconShow() {
  return `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye-slash" class="login__hide-password-icon svg-inline--fa fa-eye-slash fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"></path></svg>`;
}

function iconDone() {
  return `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" class="login__password-requirement-icon-svg svg-inline--fa fa-check fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>`;
}

function iconUnDone() {
  return `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="login__password-requirement-icon-svg svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>`;
}

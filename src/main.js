import { createStore } from "redux";

import reduce from "./reducers";
import {
  createInit,
  createLoginEmailBlur,
  createPasswordBlur,
  createLoginEmailInput,
  createPasswordInput,
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
  const { focus, email, password, validationErrors } = store.getState();
  mountNode.innerHTML = loginForm({ email, password, validationErrors });
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

  if (focus) {
    mountNode.querySelector(focus.element).focus();
    mountNode
      .querySelector(focus.element)
      .setSelectionRange(...focus.selection);
  }
}

function loginForm({ email, password, validationErrors }) {
  const disabled = validationErrors.length > 0 ? "disabled" : "";

  return `<form>
		<h1>Register</h1>
		<p>Create your personal account</p>	
		<p>${inputName(email)}</p>
		<p>${inputPassword(password)}</p>
		${hintsList(validationErrors)}
		<input type="submit" value="Register" ${disabled}/>
	</form>`;
}

function hintsList(hints) {
  if (hints.length === 0) {
    return "";
  }
  return `<ul>
		${hints.map((hint) => `<li>${hint}</li>`).join("")}
	</ul>`;
}

function inputName(email) {
  return `<label for="login-mail">Email address</label>
<input id="login-mail" class="login-mail" type="text" value="${email}"/>`;
}

function inputPassword(password) {
  return `<label>Password</label>
<input class="login-password" type="password" value="${password}"/>`;
}

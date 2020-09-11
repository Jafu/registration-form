import React from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux';

import { reduce } from './reducers';
import {
	ACTIONS,
	createInit,
	createLoginEmailBlur,
	createPasswordBlur,
	createLoginEmailInput,
	createPasswordInput,
} from './actions';


export function init() {
	const store = createStore(reduce);
	store.subscribe(render.bind(undefined, store));
	store.dispatch(createInit());
}


function render(store) {
	const mountNode = document.getElementById("app");
	const name = 'Jakob';
	const { focus, email } = store.getState();
	mountNode.innerHTML = loginForm({ email });
	mountNode.querySelector('input.login-mail').oninput = (e) => {
		store.dispatch(createLoginEmailInput(e.target));
	};
	mountNode.querySelector('input.login-mail').onblur = (e) => {
		store.dispatch(createLoginEmailBlur(e.target, e.relatedTarget));
	};
	if (focus) {
		mountNode.querySelector(focus.element).focus();
		mountNode.querySelector(focus.element).setSelectionRange(
			...focus.selection);
	}
}


function loginForm({ email }) {
	return `<form>
		<label>Email: ${inputName(email)}</label>
		<label>Password: ${inputPassword()}</label>
		<input type="submit" value="Register"/>
	</form>`;
}

function inputName(email) {
	return `<input class="login-mail" type="text" value="${email}"/>`;
}

function inputPassword() {
	return `<input class="login-password" type="password" />`;
}

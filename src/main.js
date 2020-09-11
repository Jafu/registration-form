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
	const { focus, email, password } = store.getState();
	mountNode.innerHTML = loginForm({ email, password });
	mountNode.querySelector('input.login-mail').oninput = (e) => {
		store.dispatch(createLoginEmailInput(e.target));
	};
	mountNode.querySelector('input.login-mail').onblur = (e) => {
		store.dispatch(createLoginEmailBlur(e.target, e.relatedTarget));
	};
	mountNode.querySelector('input.login-password').oninput = (e) => {
		store.dispatch(createPasswordInput(e.target));
	};
	mountNode.querySelector('input.login-password').onblur = (e) => {
		store.dispatch(createPasswordBlur(e.target, e.relatedTarget));
	};

	if (focus) {
		mountNode.querySelector(focus.element).focus();
		mountNode.querySelector(focus.element).setSelectionRange(
			...focus.selection);
	}
}


function loginForm({ email, password }) {
	return `<form>
		<label>Email: ${inputName(email)}</label>
		<label>Password: ${inputPassword(password)}</label>
		<input type="submit" value="Register"/>
	</form>`;
}

function inputName(email) {
	return `<input class="login-mail" type="text" value="${email}"/>`;
}

function inputPassword(password) {
	return `<input class="login-password" type="password" value="${password}"/>`;
}

import React from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux';


export const ACTIONS = {
	INIT: 'INIT',
	LOGIN_EMAIL_INPUT: 'LOGIN_EMAIL_INPUT',
	LOGIN_EMAIL_BLUR: 'LOGIN_EMAIL_BLUR',
};


function createInit() {
	return { type: ACTIONS.INIT, data: {
		email: 'jakob',
		focus: {
			element: 'input.login-mail',
			cursorPosition: 2,
		}
	} };
}


function createLoginEmailInput(element) {
	return {
		type: ACTIONS.LOGIN_EMAIL_INPUT,
		data: {
			value: element.value,
			focus: {
				element: 'input.login-mail',
				selection: [ element.selectionStart, element.selectionEnd ],
			}
		},
	}
}


function createLoginEmailBlur(element, activeElement) {
	return {
		type: ACTIONS.LOGIN_EMAIL_BLUR,
		data: {
			value: element.value,
			focus: {
				element: '.' + activeElement.classList.join('.'),
				selection: [ activeElement.selectionStart, activeElement.selectionEnd ],
			}
		},
	}
}

export function init() {
	const store = createStore(reduce);
	store.subscribe(render.bind(undefined, store));
	store.dispatch(createInit());
}


export function reduce(state, { type, data }) {
	switch(type) {
		case ACTIONS.INIT:
			state = data;
			break;
		case ACTIONS.LOGIN_EMAIL_INPUT:
			state.email = data.value;
			state.focus = data.focus;
			break;
		case ACTIONS.LOGIN_EMAIL_BLUR:
			state.email = data.value;
			state.focus = undefined;
		case ACTIONS.REGISTER_CLICK:
			state.validationErrors = [ 'yes' ];
		default:
	}
	return state;
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

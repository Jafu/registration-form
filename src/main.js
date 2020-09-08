import React from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux';


export const ACTIONS = {
	INIT: 'INIT',
};


function createInit() {
	return { type: ACTIONS.INIT, data: {} };
}


export function init() {
	const store = createStore(reduce);
	store.subscribe(render);
	store.dispatch(createInit);
}


export function reduce(state, { type, data }) {
	switch(type) {
		case ACTIONS.INIT:
			state = data;
			break;
		default:
	}
	return state;
}


function render() {
	var mountNode = document.getElementById("app");
	ReactDOM.render(<HelloMessage name="Jane" />, mountNode);
}


function HelloMessage({ name }) {
    return <div>Hello {name}</div>;
}

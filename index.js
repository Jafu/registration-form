import React from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux';


const store = createStore(reduce);
store.subscribe(render);

function reduce(state, { type, data }) {
	switch(type) {
		case 'INIT':
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

store.dispatch({ type: 'INIT', data: {} });

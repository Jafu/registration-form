import { ACTIONS } from './actions';


export function reduce(state, { type, data }) {
	switch(type) {
		case ACTIONS.INIT:
			state = data;
			break;
		case ACTIONS.PASSWORD_INPUT:
			state.password = data.value;
			state.focus = data.focus;
			state.validationErrors = validatePassword(state.password);
			break;
		case ACTIONS.PASSWORD_BLUR:
			state.password = data.value;
			state.focus = data.focus;
			break;
		case ACTIONS.LOGIN_EMAIL_INPUT:
			state.email = data.value;
			state.focus = data.focus;
			break;
		case ACTIONS.LOGIN_EMAIL_BLUR:
			state.email = data.value;
			state.focus = data.focus;
			break;
		case ACTIONS.REGISTER_CLICK:
			state.validationErrors = [ 'yes' ];
			break;
		default:
	}
	return state;
}


function validatePassword(password) {
	const validationErrors = [];
	if (!/\d/.test(password)) {
		validationErrors.push('Password must contain number.');
	}
	if (!/[^A-Za-z0-9]/.test(password)) {
		validationErrors.push('Password must contain special char.');
	}
	return validationErrors;
}

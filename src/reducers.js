import { ACTIONS } from './actions';


export function reduce(state, { type, data }) {
	switch(type) {
		case ACTIONS.INIT:
			state = data;
			break;
		case ACTIONS.PASSWORD_INPUT:
			state.password = data.value;
			state.focus = data.focus;
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

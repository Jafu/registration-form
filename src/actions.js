
export const ACTIONS = {
	INIT: 'INIT',
	LOGIN_EMAIL_INPUT: 'LOGIN_EMAIL_INPUT',
	LOGIN_EMAIL_BLUR: 'LOGIN_EMAIL_BLUR',
};


export function createInit() {
	return {
		type: ACTIONS.INIT,
		data: {
			email: 'jakob',
			password: '',
			validationErrors: [],
			focus: {
				element: 'input.login-mail',
				selection: [0, 0],
			},
		},
	};
}


export function createLoginEmailInput(element) {
	return {
		type: ACTIONS.LOGIN_EMAIL_INPUT,
		data: {
			value: element.value,
			focus: getFocus(element),
		},
	};
}


export function createLoginEmailBlur(element, activeElement) {
	return {
		type: ACTIONS.LOGIN_EMAIL_BLUR,
		data: {
			value: element.value,
			focus: getFocus(activeElement, true),
		},
	};
}


function getFocus(element, blur) {
	if (
		!element ||
		element.nodeName.toLowerCase() !== 'input' ||
		element.classList.length === 0
	) {
		return;
	}
	return {
		element: 'input.' + [ ...element.classList ].join('.'),
		selection: blur ? [ 0, element.value.length ] :
			[ element.selectionStart, element.selectionEnd ],
	}
}

# Registration Form
A minimal registration form with a password strength meter.

The form contains the following elements:
- An Input for the email
- An Input for the password
- A password strength meter, which validates the following rules:
	- minimal length of 8 characters
	- should contain at least one special character
	- one number
	- one uppercase letter
	- one lowercase letter
- A Button to submit the form
- A checkbox for Terms of Service
- A Button to toggle password visibility

# Third Party Technologies
- Npm
- Parcel
- Babel
- Eslint
- Prettier
- Jest
- Redux
- Fontawesome SVG Icons

# Developement

## Run app for developement


Start dev server to build and run app:
```
npm run dev
```

Find registration form at `localhost:1234`

## Test
Run tests with
```
npm run test
```

Start watch to task for tests during developement:
```
npm run test-watch
```

Run linter
```
npm run lint
```

## Next tasks
// FIXME add tests for components w/ flags
// FIXME add tests for register reducer
// FIXME add tests for email input reducer
// FIXME add tests for blur password reducer
// FIXME add tests for blur input reducer
// FIXME group view state and business logic state
// FIXME group password, email, terms data in state object

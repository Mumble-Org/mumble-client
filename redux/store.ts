import { configureStore } from "@reduxjs/toolkit";
import { signupReducer } from "./reducers/signup";
import { loginReducer } from "./reducers/login";
import logger from 'redux-logger';


export const store = configureStore({
	reducer: {
		signup: signupReducer,
		login: loginReducer,
	},

	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

import { configureStore } from "@reduxjs/toolkit";
import { signupReducer } from "./reducers/signup";
import logger from 'redux-logger';


export const store = configureStore({
	reducer: {
		signup: signupReducer,
	},

	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

import { configureStore } from "@reduxjs/toolkit";
import { onboardingReducer } from "./reducers/onboarding";
import logger from 'redux-logger';


export const store = configureStore({
	reducer: {
		onboarding: onboardingReducer,
	},

	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

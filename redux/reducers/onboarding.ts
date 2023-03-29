import { createAction, createReducer } from '@reduxjs/toolkit'

interface OnboardingState {
	user: {
		name?: string;
		email?: string;
		password?: string;
	}
}

const initialState = { user: {} } as OnboardingState;

export const onboardingReducer = createReducer(initialState, (builder) => {
	builder
		.addCase("onboard_email", (state, action) => {
			// @ts-ignore
			state.user.email = action.payload
		})
		.addCase("onboard_password", (state, action) => {
			// @ts-ignore
			state.user.password = action.payload
		})
		.addCase("onboarding_name", (state, action) => {
			// @ts-ignore
			state.user.name = action.payload
		})
})

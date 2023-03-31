import { createAction, createReducer } from '@reduxjs/toolkit'

interface SignupState {
	user: {
		name?: string;
		email?: string;
		password?: string;
	}
}

const initialState = { user: {} } as SignupState;

export const signupReducer = createReducer(initialState, (builder) => {
	builder
		.addCase("signup_email", (state, action) => {
			// @ts-ignore
			state.user.email = action.payload
		})
		.addCase("signup_password", (state, action) => {
			// @ts-ignore
			state.user.password = action.payload
		})
		.addCase("signup_name", (state, action) => {
			// @ts-ignore
			state.user.name = action.payload
		})
		.addCase("signup_type", (state, action) => {
			// @ts-ignore
			state.user.type = action.payload
		})
		.addCase("signup_genres", (state, action) => {
			// @ts-ignore
			state.user.genres = action.payload
		})
		.addCase("signup_portfolio", (state, action) => {
			// @ts-ignore
			state.user.portfolio = action.payload
		})
})

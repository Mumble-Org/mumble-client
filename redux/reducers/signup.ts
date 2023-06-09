import { createAction, createReducer } from '@reduxjs/toolkit'

interface SignupState {
	user: {
		name?: string;
		email?: string;
		password?: string;
		type?: string;
		genres?: string;
		portfolio?: string;
		location?: string;
		calendar?: string;
		phone_number?: string;
		rate?: string;
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
		.addCase("signup_location", (state, action) => {
			// @ts-ignore
			state.user.location = action.payload
		})
		.addCase("signup_calendar", (state, action) => {
			// @ts-ignore
			state.user.calendar = action.payload
		})
		.addCase("signup_phone_number", (state, action) => {
			// @ts-ignore
			state.user.phone_number = action.payload
		})
		.addCase("signup_rate", (state, action) => {
			// @ts-ignore
			state.user.rate = action.payload
		})
})

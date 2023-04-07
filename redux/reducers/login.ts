import { createReducer } from '@reduxjs/toolkit'

interface LoginState {
	user: {
		email?: string;
		password?: string;
	}
}

const initialState = { user: {} } as LoginState;

export const loginReducer = createReducer(initialState, (builder) => {
	builder
		.addCase("login_email", (state, action) => {
			// @ts-ignore
			state.user.email = action.payload
		})
		.addCase("login_password", (state, action) => {
			// @ts-ignore
			state.user.password = action.payload
		})
})

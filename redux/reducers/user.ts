import { createReducer } from '@reduxjs/toolkit'

interface UserState {
	user: {
		email?: string;
		password?: string;
	}
}

const initialState = { user: {} } as UserState;

export const userReducer = createReducer(initialState, (builder) => {
	builder
		.addCase("token", (state, action) => {
			// @ts-ignore
			state.token = action.payload
		})
		.addCase("user", (state, action) => {
			// @ts-ignore
			state.user = action.payload
		})
})

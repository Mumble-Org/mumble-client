import { createReducer } from '@reduxjs/toolkit'

interface HomeState {
	position: string;
}

const initialState = { position: 'home' } as HomeState;

export const homeReducer = createReducer(initialState, (builder) => {
	builder
		.addCase("home_position", (state, action) => {
			// @ts-ignore
			state.position = action.payload;
		})
})

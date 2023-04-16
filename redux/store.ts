import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { signupReducer } from "./reducers/signup";
import { loginReducer } from "./reducers/login";
import logger from "redux-logger";
import { userReducer } from "./reducers/user";

const persistConfig = {
  key: 'root',
  storage,
}

export const store = configureStore({
	reducer: {
		signup: signupReducer,
		login: loginReducer,
		user: persistReducer(persistConfig, userReducer),
	},

	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export const persistor = persistStore(store)

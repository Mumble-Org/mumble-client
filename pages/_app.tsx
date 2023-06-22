import "../styles/globals.css";

import { persistor, store } from "../redux/store";

import Head from "next/head";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { StyledEngineProvider } from "@mui/material/styles";

export default function MyApp({ Component, pageProps }) {
	return (
		<div>
			<Head>
				<title>Mumble</title>
				<link rel="" href="" />
				<link rel="icon" type="img/x-icon" href="/Logo.svg" />
				<meta property="og:image" content="./Logo.svg" />
			</Head>

			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<StyledEngineProvider injectFirst>
						<Component {...pageProps} />
					</StyledEngineProvider>
				</PersistGate>
			</Provider>
		</div>
	);
}

import "../styles/globals.css";
import { persistor, store } from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
	return (
		<div>
			<Head>
				<title>Mumble</title>
				<link rel="" href="" />
				<link rel="icon" type="img/x-icon" href="/Logo.svg" />
			</Head>

			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Component {...pageProps} />
				</PersistGate>
			</Provider>
		</div>
	);
}

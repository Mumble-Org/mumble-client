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

				<title>Mumble</title>
				<meta name="description" content="Marketplace for beats" />

				<meta property="og:url" content="https://mumble.com.ng" />
				<meta property="og:type" content="website" />
				<meta
					property="og:title"
					content="Mumble | Buy Beats Online | Sell Beats Online"
				/>
				<meta
					property="og:description"
					content="Mumble is a digital marketplace that connects music producers, beat makers and sound engineers to their desired clients."
				/>
				<meta property="og:image" content="https://mumble.com.ng/cover.jpg" />

				<meta name="twitter:card" content="summary_large_image" />
				<meta property="twitter:domain" content="mumble.com.ng" />
				<meta property="twitter:url" content="https://mumble.com.ng" />
				<meta
					name="twitter:title"
					content="Mumble | Buy Beats Online | Sell Beats Online"
				/>
				<meta
					name="twitter:description"
					content="Mumble is a digital marketplace that connects music producers, beat makers and sound engineers to their desired clients."
				/>
				<meta name="twitter:image" content="https://mumble.com.ng/cover.jpg" />
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

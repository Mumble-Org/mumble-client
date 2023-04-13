import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";

import { NavBar } from "../components/navigation/navbar";
import { SubNav } from "../components/navigation/subnav";
import { TrendingBeatsHome } from "../components/home/trending";
import { Player } from "../components/player";

export default function Home() {
	const [loggedIn, setLoggedIn] = useState(false);

	return (
		<div className={styles.container}>
			<Head>
				<title>Mumble</title>
				<link rel="" href="" />
			</Head>

			<NavBar loggedIn={loggedIn} />
			<SubNav loggedIn={loggedIn} />

			<TrendingBeatsHome />

			<div className={styles.player}>
				<Player />
			</div>
		</div>
	);
}

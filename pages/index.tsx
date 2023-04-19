import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { NavBar } from "../components/navigation/navbar";
import { SubNav } from "../components/navigation/subnav";
import { TrendingBeatsHome } from "../components/home/trendingBeats";
import { PopularBeatsHome } from "../components/home/popularBeats";
import { PopularProducersHome } from "../components/home/popularProducers";

export default function Home() {
	const [loggedIn, setLoggedIn] = useState(false);
	const userState = useSelector((state: any) => state.user);
	const user = userState.user;
	const token = userState.token;

	useEffect(() => {
		if (token != "" && token != undefined) {
			setLoggedIn(true);
		}
	}, []);

	return (
		<div className={styles.container}>
			<Head>
				<title>Mumble</title>
				<link rel="" href="" />
				<link rel="icon" type="img/x-icon" href="/Logo.svg" />
			</Head>

			<NavBar loggedIn={loggedIn} />
			{/* <Profile /> */}
			<SubNav loggedIn={loggedIn} />

			<div className={styles.content}>
				<TrendingBeatsHome />

				<PopularBeatsHome />

				<PopularProducersHome />
			</div>
		</div>
	);
}

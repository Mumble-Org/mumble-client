import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { NavBar } from "../components/navigation/navbar";
import { SubNav } from "../components/navigation/subnav";
import {
	TrendingBeatsHome,
	TrendingBeats,
} from "../components/home/trendingBeats";
import {
	PopularBeatsHome,
	PopularBeats,
} from "../components/home/popularBeats";
import { PopularProducersHome } from "../components/home/popularProducers";
import { PopularEngineersHome } from "../components/home/popularEngineers";

export default function Home() {
	const [loggedIn, setLoggedIn] = useState(false);
	const userState = useSelector((state: any) => state.user);
	const token = userState.token;
	const [position, setPosition] = useState("home");

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
			<SubNav loggedIn={loggedIn} setPosition={setPosition} />

			{(() => {
				switch (position) {
					case "home":
						return (
							<div className={styles.content}>
								<TrendingBeatsHome />

								<PopularBeatsHome />

								<PopularProducersHome />

								<PopularEngineersHome />
							</div>
						);
					case "trending":
						return (
							<div className={styles.content}>
								<TrendingBeats />
							</div>
						);
					case "discover":
						return (
							<div className={styles.content}>
								<PopularBeats />
							</div>
						);
					case "producers":
						return <div className={styles.content}>producers</div>;
					case "engineers":
						return <div className={styles.content}>engineers</div>;
				}
			})()}
		</div>
	);
}

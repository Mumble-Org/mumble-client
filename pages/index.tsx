import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { NavBar } from "../components/navigation/navbar";
import { SubNav } from "../components/navigation/subnav";
import { TrendingBeatsHome } from "../components/home/trending";
import { Profile } from "../components/profile";

export default function Home() {
	const [loggedIn, setLoggedIn] = useState(false);
	const userState = useSelector((state: any) => state.user);
	const user = userState.user;
	const token = userState.token;

	useEffect(() => {
		if (token != '' && token != undefined) {
			setLoggedIn(true);
		}
	}, []);

	return (
		<div className={styles.container}>
			<Head>
				<title>Mumble</title>
				<link rel="" href="" />
			</Head>

			<NavBar loggedIn={loggedIn} />
			{/* <Profile /> */}
			<SubNav loggedIn={loggedIn} />

			<TrendingBeatsHome />

		</div>
	);
}

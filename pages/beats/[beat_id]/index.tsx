import { getItem, setItem } from "../../../utils/cache";
import { useEffect, useState } from "react";

import { BackToHome } from "../../../components/buttons/buttons";
import { Beat } from "../../../components/beat";
import { Grid } from "@mui/material";
import { Loading } from "../../../components/loading";
import { NavBar } from "../../../components/navigation/navbar";
import { backend } from "../../../utils/backend";
import styles from "./beat.module.scss";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function BeatPage() {
	const [loggedIn, setLoggedIn] = useState(false);
	const router = useRouter();
	const beatId = router.query.beat_id;
	const userState = useSelector((state: any) => state.user);
	const token = userState.token;
	const [loading, setLoading] = useState(true);
	const [beat, setBeat] = useState({});

	useEffect(() => {
		if (token != "" && token != undefined) {
			setLoggedIn(true);
		}
	}, []);

	useEffect(() => {
		setLoading(true);

		if (router.isReady) {
			// Check cache
			const key = `beat_${beatId}`;
			const beatCache = getItem(key);

			if (!beatCache) {
				backend
					.get(`/beats/${beatId}`)
					.then((response) => {
						setBeat(response.data);
						setItem(key, response.data);
						setLoading(false);
					})
					.catch((error) => {
						router.push("/404", `/beats/${beatId as string}`);
					});
			} else {
				setBeat(beatCache);
				setLoading(false);
			}
		}
	}, [router.isReady]);

	return (
		<>
			<NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn}></NavBar>

			{loading ? (
				<Loading />
			) : (
				<Grid container className={styles.container}>
					<BackToHome />

					<Beat beat={beat}></Beat>
				</Grid>
			)}
		</>
	);
}

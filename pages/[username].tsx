import { useEffect, useState } from "react";

import Head from "next/head";
import { Loading } from "../components/loading";
import { NavBar } from "../components/navigation/navbar";
import { Profile } from "../components/profile/profile";
import { backend } from "../utils/backend";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function ProfilePage() {
	const [loggedIn, setLoggedIn] = useState(false);
	const userState = useSelector((state: any) => state.user);
	const token = userState.token;
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<any>({});
	const router = useRouter();
	const { username } = router.query;

	useEffect(() => {
		// Fetch user with username from backend
		async function fetchUser() {
			setLoading(true);
			try {
				console.log(`${username.toString().replace("_", " ")}`);
				const response = await backend.post(`/users/`, {
					name: `${username.toString().replace("_", " ")}`,
				});
				setUser(response.data);
				console.log("User", response.data);
			} catch (err) {
				router.push(`/404?username=${username as string}`, username as string);
				console.log(err);
			}
			setLoading(false);
		}

		if (router.isReady) {
			fetchUser();
		} else {
			setLoading(true);
		}
	}, [router.isReady, username]);

	useEffect(() => {
		if (token != "" && token != undefined) {
			setLoggedIn(true);
		}
	}, []);

	return (
		<div className={styles.container}>
			{loading ? (
				<Loading />
			) : (
				<div>
					<Head>
						<title>
							{user.name?.charAt(0).toUpperCase() + user.name?.slice(1)} |
							Mumble
						</title>
					</Head>

					<NavBar loggedIn={loggedIn} />
					{user.length ? <Profile user={user} /> : null}
				</div>
			)}
		</div>
	);
}

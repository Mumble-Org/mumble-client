import { useState, useEffect } from "react";
import { Profile } from "../components/profile/profile";
import { NavBar } from "../components/navigation/navbar";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { backend } from "../utils/backend";
import Head from "next/head";
import { useSelector } from "react-redux";
import { Loading } from "../components/loading";

export default function ProfilePage() {
	// const userState = useSelector((state: any) => state.user.user);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState({});
	const router = useRouter();
	const { username } = router.query;

	useEffect(() => {
		// Fetch user with username from backend
		async function fetchUser() {
			setLoading(true);
			try {
				const response = await backend.post(`/users/`, {
					name: `${username.toString().replace("_", " ")}`,
				});
				setUser(response.data);
			} catch (err) {
				console.log('link error', err);
			}
			setLoading(false);
		}

		if (router.isReady) {
			fetchUser();
		} else {
			setLoading(true);
		}
	}, [router.isReady, username]);

	return (
		<div className={styles.container}>
			{loading ? (
				<Loading />
			) : (
				<div>
					<NavBar loggedIn={true} />
					<Profile user={user} />
				</div>
			)}
		</div>
	);
}

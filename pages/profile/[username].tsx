import { useState, useEffect } from "react";
import { Profile } from "../../components/profile/profile";
import { NavBar } from "../../components/navigation/navbar";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import { backend } from "../../utils/backend";
import Head from "next/head";
import { useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";

export default function ProfilePage() {
	// const userState = useSelector((state: any) => state.user.user);
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState({});
	const router = useRouter();
	const { username, id } = router.query;

	useEffect(() => {
		// Fetch user with username from backend
		async function fetchUser() {
			setLoading(true);
			try {
				const response = await backend.post(
					`/users/`, {name: `${username.toString().replace("_", " ")}`}
				);
				setUser(response.data.user);
			} catch (err) {
				console.log(err);
			}
			setLoading(false);
		}
		fetchUser();
	}, []);

	return (
		<div className={styles.container}>
			<Head>
				<title>Mumble</title>
				<link rel="" href="" />
				<link rel="icon" type="img/x-icon" href="/Logo.svg" />
			</Head>

			<NavBar loggedIn={true} />
			{loading ? (
				<ThreeDots
					height="64"
					width="64"
					color="#febfff"
					wrapperClass="loader"
				/>
			) : (
				""
			)}
			<Profile user={user} />
		</div>
	)
}
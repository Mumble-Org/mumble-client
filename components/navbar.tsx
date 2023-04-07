import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.css";

export function NavBar(props) {
	return (
		<div className={styles.container}>
			<Link href="/">
				<Image width="56" height="56" alt="mumble logo" src="/Logo.svg" />
			</Link>

			<div className={styles.search_container}>
				<Image
					width="17"
					height="17"
					alt="Search for producers, beats, genres and engineers"
					src="/search.svg"
				/>

				<input placeholder="Search for producers, beats, genres and engineers"></input>
			</div>

			{props.loggedIn ? (
				<div>logged in</div>
			) : (
				<div className={styles.actions_container}>
					<div className={styles.login_signup}>
						<Link href="/signup">Sign up</Link>
						<p>/</p>
						<Link href="/login">Login</Link>
					</div>

					<Link href="/signup" className={styles.upload_beat}>
						<Image
							width="20"
							height="20"
							alt="upload a beat"
							src="/upload_black.svg"
						/>
						<p>Upload A Beat</p>
					</Link>
				</div>
			)}
		</div>
	);
}

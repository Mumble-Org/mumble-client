import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./navbar.module.css";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set as userSet } from "../../redux/actions/user";
import { backend } from "../../utils/backend";

export function NavBar(props) {
	const dispatch = useDispatch();
	const router = useRouter();
	const userState = useSelector((state: any) => state.user);
	const user = userState.user;
	const token = userState.token;
	const [profileOpen, setProfileOpen] = useState(false);

	const ClickOutside = (props) => {
		const ref = useRef(null);

		useEffect(() => {
			const handleClickOutside = (event) => {
				if (ref.current && !ref.current.contains(event.target)) {
					// The click was outside the component, do something
					setProfileOpen(false);
				}
			};

			document.addEventListener("mousedown", handleClickOutside);

			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [props, ref]);

		return (
			<div style={{ cursor: "pointer" }} ref={ref}>
				{props.children}
			</div>
		);
	};

	const handleProfileOpen = () => {
		const open = profileOpen;
		setProfileOpen(!open);
	};

	const handleSettings = () => {
		router.push("/settings");
	};

	const handleSignOut = () => {
		dispatch(userSet("user", ""));
		dispatch(userSet("token", ""));

		router.reload();
	};

	return (
		<div className={styles.container}>
			<Link href="/">
				<Image
					width="56"
					height="56"
					alt="mumble logo"
					src="/Logo.svg"
					className={styles.logo}
				/>
			</Link>

			<div className={styles.search_container}>
				<Image
					width="16"
					height="16"
					alt="Search for producers, beats, genres and engineers"
					src="/search.svg"
				/>

				<input placeholder="Search for producers, beats, genres and engineers"></input>
			</div>

			{props.loggedIn ? (
				<div className={styles.profile_container}>
					<ClickOutside>
						<div className={styles.profile_button} onClick={handleProfileOpen}>
							<div className={styles.profile_image}>
								{user.imageUrl && user.imageUrl != "" ? (
									<Image
										width="56"
										height="56"
										alt="profile picture"
										src={user.imageUrl}
									/>
								) : (
									<div className={styles.profile_letter_div}>
										{user.name.charAt(0).toUpperCase()}
									</div>
								)}
							</div>

							<Image
								width="11"
								height="6"
								alt="profile dropdown"
								src={
									profileOpen
										? "/profile_arrow_up.svg"
										: "/profile_arrow_down.svg"
								}
							/>
						</div>

						{profileOpen ? (
							<div className={styles.profile_dropdown}>
								<p onClick={() => router.push("/profile")}>Dashboard</p>
								<p onClick={handleSettings}>Settings</p>
								<p onClick={handleSignOut}>Sign Out</p>
							</div>
						) : (
							""
						)}
					</ClickOutside>
				</div>
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

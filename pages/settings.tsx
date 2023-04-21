import styles from "../styles/settings.module.css";
import { NavBar } from "../components/navigation/navbar";
import { BackToHome } from "../components/buttons/buttons";

import Image from "next/image";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function Settings() {
	const [loggedIn, setLoggedIn] = useState(false);
	const userState = useSelector((state: any) => state.user);
	const token = userState.token;
	const router = useRouter();
	const [transparent, setTransparent] = useState(false);
	const [picture, setPicture] = useState("");
	const [profilePicture, setProfilePicture] = useState("/profile_picture.svg");

	useEffect(() => {
		if (token != "" && token != undefined) {
			setLoggedIn(true);
		} else {
			router.push("/login");
		}
	}, []);

	const handleChangeProfilePicture = (e) => {
		setTransparent(true);
	};

	const handlePicture = (e) => {
		e.preventDefault();
		const image = e.target.files[0];
		try {
			setPicture(URL.createObjectURL(image));
		} catch (e) {}
	};

	return (
		<div className={styles.container}>
			<div
				className={`${styles.transparent} ${
					transparent ? styles.transparent_active : ""
				}`}
			></div>

			{transparent ? (
				<div className={styles.set_picture}>
					<div className={styles.set_picture_header}>
						<h4>Edit Photo</h4>
						<Image
							width="20"
							height="20"
							alt="exit"
							src="/exit.svg"
							onClick={() => setTransparent(false)}
						/>
					</div>

					<Image
						width="400"
						height="400"
						alt="profile picture"
						src={picture != "" ? picture : profilePicture}
					/>

					<div className={styles.save_container}>
						<div className={styles.save_button}>Save</div>
					</div>
				</div>
			) : (
				""
			)}

			<NavBar loggedIn={loggedIn} />

			<div className={styles.profile_picture}>
				<div className={styles.back}>
					<BackToHome text="Back" />
				</div>

				<div className={styles.profile_image}>
					<Image
						width="264"
						height="264"
						alt="profile picture"
						src={profilePicture}
					/>
				</div>

				<div className={styles.buttons}>
					<label className={styles.change} onClick={handleChangeProfilePicture}>
						Change Profile Picture
						<input
							name="profile"
							type="file"
							accept="image/*"
							onChange={handlePicture}
						></input>
					</label>

					<div className={styles.edit}>
						<div className={styles.edit_inner}>
							<p>Edit Profile Picture</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

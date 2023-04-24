import styles from "../styles/settings.module.css";
import { NavBar } from "../components/navigation/navbar";
import { BackToHome } from "../components/buttons/buttons";
import { backend } from "../utils/backend";

import Image from "next/image";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function Settings() {
	const userState = useSelector((state: any) => state.user);
	const token = userState.token;
	const [loggedIn, setLoggedIn] = useState(false);
	const router = useRouter();
	const [transparent, setTransparent] = useState(false);
	const [picture, setPicture] = useState({ preview: "", data: "" });
	const [profilePicture, setProfilePicture] = useState("");

	/**
	 * Make sure user is logged in
	 */
	useEffect(() => {
		if (token != "" && token != undefined) {
			setLoggedIn(true);
		} else {
			router.push("/login");
		}
	}, [token, router]);

	/**
	 * Get profile picture of user
	 */
	useEffect(() => {
		try {
			backend
				.get("/users/profile", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					setProfilePicture(response.data.imageUrl);
				});
		} catch (e) {}
	}, []);

	const handleChangeProfilePicture = (e) => {
		setTransparent(true);
	};

	const handlePicture = (e) => {
		e.preventDefault();

		const image = {
			preview: URL.createObjectURL(e.target.files[0]),
			data: e.target.files[0],
		};
		try {
			setPicture(image);
		} catch (e) {}
	};

	const handleSaveProfilePicture = async (e) => {
		const formData = new FormData();
		formData.append("image", picture.data);
		try {
			await backend.put("/users/profileImage", formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data",
				},
			});

			router.reload();
		} catch (e) {
			// router.push('/login');
		}
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
						src={picture.preview != "" ? picture.preview : profilePicture}
					/>

					<div className={styles.save_container}>
						<div
							className={styles.save_button}
							onClick={handleSaveProfilePicture}
						>
							Save
						</div>
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
					{profilePicture != "" ? (
						<Image
							width="264"
							height="264"
							alt="profile picture"
							src={profilePicture}
						/>
					) : (
						<div className={styles.profile_image_text}>
							{userState.user.name.charAt(0).toUpperCase()}
						</div>
					)}
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

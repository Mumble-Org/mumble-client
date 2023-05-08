import styles from "../../styles/settings.module.scss";
import { NavBar } from "../../components/navigation/navbar";
import { BackToHome } from "../../components/buttons/buttons";
import { backend } from "../../utils/backend";

import Image from "next/image";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { set as userSet } from "../../redux/actions/user";

// material ui
import { Grid, Box, Button, Avatar, Typography, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Producer } from "../../components/settings/producer";
import { Engineer } from "../../components/settings/engineer";
import { Artist } from "../../components/settings/artist";

export default function Settings() {
	const dispatch = useDispatch();
	const userState = useSelector((state: any) => state.user);
	const token = userState.token;
	const [user, setUser] = useState<any>(undefined);
	const [loggedIn, setLoggedIn] = useState(false);
	const router = useRouter();
	const [transparent, setTransparent] = useState(false);
	const [picture, setPicture] = useState({ preview: "", data: "" });
	const [profilePicture, setProfilePicture] = useState("");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

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
		backend
			.get("/users/profile", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				setProfilePicture(response.data.imageUrl);
				response.data.user.imageUrl = response.data.imageUrl;
				dispatch(userSet("user", response.data.user));
			})
			.catch((e) => {
				if (e.response.status === 401) router.push("/login");
			});
	}, []);

	/**
	 * Get user profile
	 */
	useEffect(() => {
		setLoading(true);
		backend
			.post(
				"/users/",
				{ name: userState.user.name },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((response) => {
				setUser(response.data);
				dispatch(userSet("user", response.data));
			})
			.catch((e) => {
				if (e.response.status === 401) router.push("/login");
			});
		setLoading(false);
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
		setLoading(true);
		const formData = new FormData();
		formData.append("image", picture.data);
		try {
			await backend.put("/users/profileImage", formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data",
				},
			});
			setLoading(false);
			setSuccess(true);
			router.reload();
		} catch (e) {
			// router.push('/login');
			setError(true);
		}
		setLoading(false);
	};

	/**
	 * Select user profile component based on user type
	 * @returns component
	 */
	const handleUserInformation = () => {
		switch (user.type) {
			case "producer":
				return <Producer user={user} token={token} setUser={setUser} />;
			case "engineer":
				return <Engineer user={user} token={token} setUser={setUser} />;
			case "artist":
				return <Artist user={user} token={token} setUser={setUser} />;
		}
	};

	try {
		return (
			<Grid container className={styles.container}>
				{transparent ? <Box className={styles.transparent}></Box> : ""}

				{transparent ? (
					<Grid container className={styles.change_profile_picture}>
						<CloseIcon
							className={styles.close}
							onClick={() => {
								setTransparent(false);
								setPicture({ preview: "", data: "" });
							}}
						/>

						<Typography variant="h4">Edit Photo</Typography>

						{profilePicture || picture.preview ? (
							<Image
								width="400"
								height="400"
								alt="profile picture"
								src={picture.preview != "" ? picture.preview : profilePicture}
								className={styles.profile_picture}
							/>
						) : (
							<Typography sx={{ alignSelf: "center", padding: "200px" }}>
								No Picture Selected
							</Typography>
						)}

						{loading ? (
							<ThreeDots
								color="#febfff"
								wrapperStyle={{
									alignSelf: "center",
									position: "absolute",
									bottom: "24px",
								}}
							/>
						) : (
							""
						)}

						<Button
							variant="contained"
							className={`${styles.contained_button} ${styles.buttons_props}`}
							sx={{ alignSelf: "flex-end" }}
							onClick={handleSaveProfilePicture}
						>
							Save
						</Button>
					</Grid>
				) : (
					""
				)}

				<NavBar loggedIn={loggedIn} />

				<Grid container className={styles.profile_picture}>
					<Box className={styles.back}>
						<BackToHome text="Back" />
					</Box>

					<Box className={styles.image_container}>
						<Avatar
							alt="profile picture"
							src={profilePicture}
							className={styles.image}
						>
							{userState.user.name.charAt(0).toUpperCase()}
						</Avatar>
					</Box>

					<Grid container className={styles.buttons}>
						<Button
							variant="contained"
							component="label"
							className={`${styles.contained_button} ${styles.buttons_props}`}
							sx={{ alignSelf: "flex-end" }}
							onClick={handleChangeProfilePicture}
						>
							Change Profile Picture
							<input
								hidden
								accept="image/*"
								multiple
								type="file"
								onChange={handlePicture}
							/>
						</Button>

						<Box className={styles.outline_button}>
							<Box className={styles.inline_button}>
								<Button variant="outlined" className={`${styles.edit_picture} ${styles.buttons_props}`}>
									Edit Profile Photo
								</Button>
							</Box>
						</Box>
					</Grid>
				</Grid>

				{/* User Information */}
				{user ? (
					handleUserInformation()
				) : (
					<ThreeDots
						color="#febfff"
						wrapperStyle={{
							alignSelf: "center",
							position: "absolute",
							bottom: "24px",
						}}
					/>
				)}

				{success && (
					<Alert severity="success" className={styles.alert}>
						Profile Picture Updated Successfully
					</Alert>
				)}

				{error && (
					<Alert
						severity="error"
						className={styles.alert}
						onClose={() => setError(false)}
					>
						Error uploading profile picture. Please try again
					</Alert>
				)}
			</Grid>
		);
	} catch (e) {
		router.push("/login");

		return <></>;
	}
}

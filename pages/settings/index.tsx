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
import {
	Grid,
	Box,
	Button,
	Avatar,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Settings() {
	const dispatch = useDispatch();
	const userState = useSelector((state: any) => state.user);
	const token = userState.token;
	const [loggedIn, setLoggedIn] = useState(false);
	const router = useRouter();
	const [transparent, setTransparent] = useState(false);
	const [picture, setPicture] = useState({ preview: "", data: "" });
	const [profilePicture, setProfilePicture] = useState("");
	const [loading, setLoading] = useState(false);

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
			router.reload();
		} catch (e) {
			// router.push('/login');
		}
		setLoading(false);
	};

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

					<Image
						width="400"
						height="400"
						alt="profile picture"
						src={picture.preview != "" ? picture.preview : profilePicture}
						className={styles.profile_picture}
					/>

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
						className={styles.contained_button}
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
						className={styles.contained_button}
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
							<Button variant="outlined" className={styles.edit_picture}>
								Edit Profile Photo
							</Button>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Grid>
	);
}

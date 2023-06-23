import {
	Alert,
	Avatar,
	Box,
	Button,
	Grid,
	Stack,
	Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";

import EmailIcon from "@mui/icons-material/Email";
import Image from "next/image";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { LocationOn } from "@mui/icons-material";
import { Reviews } from "../profile/reviews";
import { SongsProduced } from "../profile/songsProduced";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { TotalEarnings } from "./totalEarnings";
import UploadedBeats from "../profile/uploadedBeats";
import styles from "./dashboard.module.scss";
import { useRouter } from "next/router";

export const Dashboard = (props) => {
	const { user } = props;
	const [userRating, setUserRating] = useState([]);
	const [scene, setScene] = useState("uploaded beats");
	const router = useRouter();
	const [alert, setAlert] = useState(false);

	useEffect(() => {
		const rating = genRating(user.rating || 0);
		setUserRating(rating);
	}, []);

	// Close alert
	useEffect(() => {
		setTimeout(() => setAlert(false), 5000);
	}, [alert]);

	const copyProfileURL = () => {
		navigator.clipboard.writeText(
			`https://mumble-client.vercel.app/${user.name.replace(" ", "_")}`
		);
		setAlert(true);
	};

	const handleUpload = () => {
		router.push("/upload");
	};

	return (
		<Grid container direction="column" className={styles.container}>
			{/* Profile image */}
			<Grid container className={styles.profile_image_container}>
				<Avatar
					src={user.imageUrl}
					alt="Profile image"
					className={styles.image}
				>
					{user.name?.charAt(0).toUpperCase()}
				</Avatar>
			</Grid>

			<Grid container direction="column" className={styles.producer_details}>
				<Box className={styles.user_name}>
					<Typography className={styles.text}>
						{user.name?.charAt(0).toUpperCase() + user.name?.slice(1)}
					</Typography>
				</Box>

				<Box className={styles.type}>
					<Typography className={styles.text}>
						{user.type?.charAt(0).toUpperCase() + user.type?.slice(1)}
					</Typography>
				</Box>

				<Stack direction="row" className={styles.location}>
					<LocationOn sx={{ color: "#B2B2B2" }} className={styles.icon} />
					<Typography className={styles.text}>
						{user.location?.split(", ")[0] || "-"}
					</Typography>
				</Stack>

				<Stack direction="row" className={styles.rating}>
					{userRating}
				</Stack>

				{/* Info section */}
				<Stack direction="row" className={styles.info}>
					{/* Beats sold */}
					<Stack direction="row" className={styles.info_child}>
						<Image
							src="/divisor.svg"
							alt="beats sold"
							width="20"
							height="20"
							className={styles.icon}
						/>
						<Typography className={styles.text}>Beats Sold</Typography>
						{user.beats_sold}
					</Stack>

					{/* Beats uploaded */}
					<Stack direction="row" className={styles.info_child}>
						<Image
							src="/upload.svg"
							alt="beats uploaded"
							width="20"
							height="20"
							className={styles.icon}
						/>
						<Typography className={styles.text}>Beats Uploaded</Typography>
						{user.beats_uploaded}
					</Stack>

					{/* Email */}
					<Stack direction="row" className={styles.info_child}>
						<EmailIcon className={styles.icon} />
						<Typography className={styles.text}>Email Address</Typography>
						{user.email}
					</Stack>

					{/* Phone number */}
					<Stack direction="row" className={styles.info_child}>
						<LocalPhoneIcon className={styles.icon} />
						<Typography className={styles.text}>Phone Number</Typography>
						{user.phone_number || "-"}
					</Stack>
				</Stack>
			</Grid>

			<Stack direction="row" className={styles.actions}>
				<Button
					className={styles.upload_beat}
					onClick={handleUpload}
					startIcon={
						<Image
							width="16"
							height="16"
							alt="Upload beat"
							src="/upload_black.svg"
						/>
					}
				>
					<Typography className={styles.text}>Upload Beat</Typography>
				</Button>

				<Box className={styles.share_profile} onClick={copyProfileURL}>
					<Button className={styles.inner}>
						<Typography className={styles.text}>Share Profile</Typography>
					</Button>
				</Box>
			</Stack>

			{/* Scenes */}
			<Stack
				direction="row"
				sx={{ gap: "16px" }}
				className={styles.user_content}
			>
				{/* Uploaded beats */}
				<Box className={styles.scene_container}>
					<Button
						className={`${styles.scene} ${
							scene !== "uploaded beats" ? styles.scene_inactive : ""
						}`}
						onClick={() => {
							setScene("uploaded beats");
						}}
					>
						Uploaded Beats
					</Button>

					{scene === "uploaded beats" ? (
						<hr className={styles.underline} />
					) : (
						""
					)}
				</Box>

				{/* Songs Produced */}
				<Box className={styles.scene_container}>
					<Button
						className={`${styles.scene} ${
							scene !== "songs produced" ? styles.scene_inactive : ""
						}`}
						onClick={() => {
							setScene("songs produced");
						}}
					>
						Songs produced
					</Button>
					{scene === "songs produced" ? (
						<hr className={styles.underline} />
					) : (
						""
					)}
				</Box>

				{/* Total earnings */}
				<Box className={styles.scene_container}>
					<Button
						className={`${styles.scene} ${
							scene !== "total earnings" ? styles.scene_inactive : ""
						}`}
						onClick={() => {
							setScene("total earnings");
						}}
					>
						Total earnings
					</Button>

					{scene === "total earnings" ? (
						<hr className={styles.underline} />
					) : (
						""
					)}
				</Box>

				{/* Reviews */}
				<Box className={styles.scene_container}>
					<Button
						className={`${styles.scene} ${
							scene !== "reviews" ? styles.scene_inactive : ""
						}`}
						onClick={() => {
							setScene("reviews");
						}}
					>
						Reviews
					</Button>
					{scene === "reviews" ? <hr className={styles.underline} /> : ""}
				</Box>
			</Stack>

			<SubScene id={user._id} scene={scene} user={user} />

			{alert && (
				<Alert className={styles.alert} onClose={() => setAlert(false)}>
					Link copied to clipboard
				</Alert>
			)}
		</Grid>
	);
};

function SubScene(props) {
	const { scene, id, user } = props;

	const selectScene = () => {
		switch (scene) {
			case "uploaded beats":
				return <UploadedBeats id={id} />;
			case "songs produced":
				return <SongsProduced user={user} />;
			case "total earnings":
				return <TotalEarnings user={user} />;
			case "reviews":
				return <Reviews user={user} />;
		}
	};

	return <Stack className={styles.scene_content}>{selectScene()}</Stack>;
}

const genRating = (rating: number) => {
	const ratings: Array<any> = [];
	let i = 0;
	for (i; i < rating; i++) {
		ratings.push([
			<StarIcon sx={{ color: "#FFD705" }} className={styles.rate} key={i} />,
		]);
	}

	for (i; i < 5; i++) {
		ratings.push([<StarBorderIcon className={styles.rate} key={i} />]);
	}

	return ratings;
};

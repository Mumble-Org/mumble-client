import {
	Alert,
	AlertColor,
	Avatar,
	Box,
	Button,
	Grid,
	Stack,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import Image from "next/image";
import KeyIcon from "@mui/icons-material/Key";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded";
import { Player } from "../player";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { backend } from "../../utils/backend";
import styles from "./beat.module.scss";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export function Beat(props) {
	const [saved, setSaved] = useState<boolean>(props.saved || false);
	const [alert, setAlert] = useState(false);
	const [message, setMessage] = useState("Beat saved successfully!!!");
	const [severity, setSeverity] = useState<AlertColor>("success");
	const token = useSelector((state: any) => state.user.token);
	const router = useRouter();

	/**
	 * Reset alert
	 */
	useEffect(() => {
		if (alert) setTimeout(() => setAlert(false), 3000);
	}, [alert, setAlert]);

	const setPrice = (price) => {
		const formattedInput = Number(price).toLocaleString();
		return formattedInput;
	};

	const openProducerProfile = () => {
		router.push(`/${props.beat.producer.name.replace(" ", "_")}`);
	};

	const handleSaveBeat = async () => {
		const save = !saved;

		if (!token) {
			setMessage("Please login or signup to save a beat");
			setSeverity("error");
			setAlert(true);
			router.push("/login");
		} else {
			setSaved(save);

			if (save) {
				setMessage("Beat saved successfully!!!");
				await backend.put(
					`/beats/save?beat_id=${props.beat._id}`,
					{},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
			} else {
				setMessage("Beat unsaved successfully!!!");
				await backend.put(
					`/beats/unsave?beat_id=${props.beat._id}`,
					{},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
			}

			setSeverity("success");
			setAlert(true);
		}
	};

	return (
		<Grid container className={styles.container}>
			<Image
				width="296"
				height="296"
				alt="beat artwork"
				src={props.beat.imageSignedUrl}
				className={styles.beat_art}
			/>

			<Stack className={styles.sub_container}>
				<Stack direction="row" className={styles.header}>
					<Typography variant="h1">{props.beat.name}</Typography>

					<Stack direction="row" className={styles.trending_icon}>
						{(() => {
							switch (props.type) {
								case "trending":
									return (
										<Image
											width="19"
											height="11"
											alt="trending icon"
											src="/trending.svg"
										/>
									);
								case "popular":
									return (
										<Image
											width="13"
											height="20"
											alt="popular icon"
											src="/popular.svg"
										/>
									);
							}
						})()}
						<Typography className={styles[props.type]}>
							{(() => {
								switch (props.type) {
									case "trending":
										return "Trending";
									case "popular":
										return "Popular";
								}
							})()}
						</Typography>
					</Stack>
				</Stack>

				<Stack
					direction="row"
					className={styles.producer}
					onClick={openProducerProfile}
				>
					{props.beat.producer?.image != undefined ? (
						""
					) : (
						<Avatar
							src={props.beat.producer.imageUrl}
							className={styles.producer_icon}
						>
							{props.beat.producer.name.charAt(0).toUpperCase()}
						</Avatar>
					)}

					<Typography variant="h2">
						{props.beat.producer.name.charAt(0).toUpperCase() +
							props.beat.producer.name.slice(1)}
					</Typography>

					<Stack direction="row" className={styles.rating}>
						{genRating(props.beat.producer.rating)}
					</Stack>
				</Stack>

				<Player src={props.beat.audioSignedUrl} beatId={props.beat._id} />

				<Stack direction="row" className={styles.footer}>
					<Stack direction="row" className={styles.footer_left}>
						<Button className={styles.buy_now}>Buy Now</Button>

						<Box className={styles.save_beat_outer}>
							<Button
								className={styles.save_beat_inner}
								onClick={handleSaveBeat}
							>
								<Typography>{saved ? "Unsave Beat" : "Save Beat"}</Typography>
							</Button>
						</Box>

						<Image
							width="23"
							height="23"
							alt="price tag"
							src="/price_tag.svg"
						/>

						<Typography className={styles.text}>
							NGN. {setPrice(props.beat.price)}
						</Typography>

						<KeyIcon className={styles.icon} sx={{ color: "#e5e5e5" }} />

						<Typography className={styles.text}>
							{props.beat.license.charAt(0).toUpperCase() +
								props.beat.license.slice(1)}
						</Typography>

						<MusicNoteRoundedIcon
							className={styles.icon}
							sx={{ color: "#e5e5e5" }}
						/>

						<Typography className={styles.text}>
							{props.beat.genre.charAt(0).toUpperCase() +
								props.beat.genre.slice(1)}
						</Typography>
					</Stack>

					<Stack direction="row" className={styles.footer_right}>
						<Typography className={styles.subtext}>
							Uploaded{" "}
							{new Date(props.beat.createdAt).toLocaleString("en-us", {
								month: "long",
								day: "numeric",
								year: "numeric",
							})}
						</Typography>
					</Stack>
				</Stack>
			</Stack>

			{/* Success message */}
			{alert ? (
				<Alert
					severity={severity}
					className={styles.alert}
					onClose={() => setAlert(false)}
				>
					{message}
				</Alert>
			) : null}
		</Grid>
	);
}

function genRating(rating: number) {
	let result = [];
	let i = 0;

	for (i; i < rating; i++) {
		result.push(
			<StarIcon key={i} sx={{ color: "#FFD705" }} className={styles.image} />
		);
	}

	for (i; i < 5; i++) {
		result.push(<StarBorderIcon key={i} className={styles.image} />);
	}
	return result;
}

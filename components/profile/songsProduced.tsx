import React, { useEffect, useState } from "react";
import { backend } from "../../utils/backend";
import styles from "./songsProduced.module.scss";
import Image from "next/image";
import { Grid, Link, Stack, Typography } from "@mui/material";

export const SongsProduced = (props) => {
	const [songs, setSongs] = useState([
		{ title: "Song title", link: "#" },
		{ title: "Song title", link: "#" },
	]);
	const { user } = props;

	useEffect(() => {
		async function fetchSongs() {
			// const response = await backend(`/users/`);
			// setSongs(response.data);
		}
	}, []);
	return (
		<Grid container direction="column" className={styles.container}>
			{/* Song links */}
			{songs.map((song) => {
				return (
					<Stack direction="row" key={song.title} className={styles.song}>
						<Stack direction="row" className={styles.song_left}>
							<Image
								src="/portfolio.svg"
								alt="cover art"
								height={96}
								width={96}
								className={styles.image}
							/>

							<Stack direction="column" className={styles.song_info}>
								<Typography variant="h3" className={styles.title}>
									{song.title}
								</Typography>

								<Typography variant="h3" className={styles.producer}>
									{user.name.charAt(0).toUpperCase() + user.name.slice(1)}
								</Typography>
							</Stack>
						</Stack>

						<Link href={song.link} target="_blank" rel="noreferrer" underline="none" className={styles.link}>
							Listen Now
						</Link>
					</Stack>
				);
			})}
		</Grid>
	);
};

import React, { useEffect, useState } from "react";
import { backend } from "../../utils/backend";
import styles from "./songsProduced.module.scss";
import Image from "next/image";
import { Grid, Link, Stack, Typography } from "@mui/material";

export const SongsProduced = (props) => {
	const { id } = props;
	const [songs, setSongs] = useState([
		{ title: "Song title", link: "#" },
		{ title: "Song title", link: "#" },
	]);

	useEffect(() => {
		async function fetchSongs(id: string) {
			const response = await backend(`/users/${id}/songsProduced`);
			setSongs(response.data);
		};

		fetchSongs(id);
	}, []);
	return (
		<Grid container direction="column" className={styles.container}>
			{/* Song links */}
			{songs.map((song) => {
				return (
					song
				);
			})}
		</Grid>
	);
};

import { Grid, Link, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import DOMPurify from "dompurify";
import Image from "next/image";
import { ThreeDots } from "react-loader-spinner";
import { backend } from "../../utils/backend";
import styles from "./songsProduced.module.scss";

export const SongsProduced = (props) => {
	const { user } = props;
	const [songs, setSongs] = useState([...user.portfolio]);

	return (
		<Grid container direction="column" className={styles.container}>
			{/* Song links */}
			{songs.map((song) => {
				return (
					<div
						key={song}
						className={styles.songEmbed}
						dangerouslySetInnerHTML={{ __html: song }}
					></div>
				);
			})}
		</Grid>
	);
};

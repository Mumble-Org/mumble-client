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
					<div key={song.link} className={styles.song}>
						<div className={styles.title}>
							{ song.title }
						</div>
						<div className={styles.link}>
							<a href={ song.link } target="_blank" className={styles.link_text}><div>Listen Now</div></a>
						</div>
					</div>
				);
			})}
		</Grid>
	);
};

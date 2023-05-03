import React, { useEffect, useState } from "react";
import { backend } from "../../utils/backend";
import styles from "./profile.module.css";
import Image from "next/image";

export const SongsProduced = (props) => {
	const [songs, setSongs] = useState([
		{ title: "Song title" },
		{ title: "Song title" },
	]);
	const { user } = props;

	useEffect(() => {
		async function fetchSongs() {
			// const response = await backend(`/users/`);
			// setSongs(response.data);
		}
	}, []);
	return (
		<div className={styles.songs}>
			{songs.map((song) => {
				return (
					<div key={song.title}>
						<div className={styles.song}>
							<div className={styles.songLeft}>
								<Image
									src="/portfolio.svg"
									alt="cover art"
									height={96}
									width={96}
									className={styles.songImage}
								/>

								<div className={styles.songInfo}>
									<div className={styles.songTitle}>{song.title}</div>
									<div className={styles.songProducer}>
										{user.name.charAt(0).toUpperCase() + user.name.slice(1)}
									</div>
								</div>
							</div>

							<button className={styles.linkButton}>
								<div>Listen Now</div>
							</button>
						</div>
					</div>
				);
			})}
		</div>
	);
};

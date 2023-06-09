import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import styles from "./player.module.scss";
import { backend } from "../../utils/backend";
import { Stack, Typography } from "@mui/material";

let interval;

export function Player(props) {
	const [playing, setPlaying] = useState(false);
	const audio = useRef<any>();
	const duration = audio.current ? audio.current?.duration : 0;
	const [progress, setProgress] = useState(0);
	const [percentage, setPercentage] = useState(0);
	const [done, setDone] = useState(true);

	/**
	 * Set progress percentage
	 */
	useEffect(() => {
		const timeOut = setTimeout(() => {
			const pro = progress;
			let value = (pro / audio.current?.duration) * 100;
			setPercentage(value);
		});

		return () => {
			clearTimeout(timeOut);
		};
	}, [progress]);

	const handlePlay = () => {
		const play = !playing;
		setPlaying(play);
		let value = progress;

		if (play) {
			const status = done;
			audio.current?.play();
			interval = setInterval(() => {
				if (value > audio.current?.duration && audio.current?.paused) {
					setProgress(0);
					setPlaying(false);
					setPercentage(0);
					setDone(true);
					clearInterval(interval);
				} else {
					setProgress((value += 1));
					setDone(false);
				}
			}, 1000);

			if (status) {
				try {
					backend.put(`/beats/plays?id=${props.beatId}`).then(() => {
						setDone(false);
					});
				} catch (e) {
					console.log(e);
				}
			}
		} else {
			audio.current?.pause();
			clearInterval(interval);
		}
	};

	return (
		<Stack direction="row" className={styles.container}>
			<Image
				width="56"
				height="56"
				alt="play"
				src={playing ? "/pauseAudio.svg" : "/playAudio.svg"}
				onClick={handlePlay}
				className={styles.button}
			/>

			<Stack direction="row" className={styles.progress_bar}>
				<Stack
					direction="row"
					className={styles.progress}
					style={{ width: `${percentage}%`, maxWidth: "100%" }}
				></Stack>
			</Stack>

			<Typography className={styles.timer}>
				{duration
					? `${Math.round(duration / 60)} : ${Math.round(duration % 60)}`
					: ""}
			</Typography>

			<audio
				src={props.src}
				controls
				controlsList="nodownload"
				className={styles.audioPlayer}
				ref={audio}
			/>
		</Stack>
	);
}

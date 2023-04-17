import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import styles from "./player.module.css";

export function Player(props) {
	const [playing, setPlaying] = useState(false);
	const audio = useRef<any>();
	const duration = audio.current ? audio.current?.duration : 0;
	const [interval, setIntervalObj] = useState() as any;
	const [progress, setProgress] = useState(0);
	const [percentage, setPercentage] = useState(0);

	useEffect(() => {
		let value = (progress / audio.current?.duration) * 100;
		setPercentage(value);
	}, [progress]);

	const handlePlay = () => {
		const play = !playing;
		setPlaying(play);
		let value = progress;

		if (play) {
			audio.current?.play();
			setIntervalObj(setInterval(() => {

				if (value > audio.current?.duration) {
					setProgress(0);
					setPlaying(false);
				} else {
					setProgress(value += 1);
				}
			}, 1000));
		}
		else {
			audio.current?.pause();
			clearInterval(interval);
		}
	};

	return (
		<div className={styles.container}>
			<Image
				width="56"
				height="56"
				alt="play"
				src={playing ? "/pauseAudio.svg" : "/playAudio.svg"}
				onClick={handlePlay}
				className={styles.button}
			/>

			<div className={styles.progress_bar}>
				<div className={styles.progress} style={{ width: `${percentage}%`, maxWidth: '100%' }}></div>
			</div>

			<p className={styles.timer}>
				{duration ? `${Math.round(duration / 60)} : ${Math.round(duration % 60)}` : ''}
			</p>

			<audio
				src={props.src}
				controls
				controlsList="nodownload"
				className={styles.audioPlayer}
				ref={audio}
			/>
		</div>
	);
}

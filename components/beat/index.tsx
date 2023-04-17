import styles from "./beat.module.css";
import Image from "next/image";
import { Player } from "../player";

export function Beat(props) {
	const setPrice = (price) => {
		const formattedInput = Number(price).toLocaleString();
		return formattedInput;
	};

	return (
		<div className={styles.container}>
			<Image
				width="296"
				height="296"
				alt="beat artwork"
				src={props.beat.imageSignedUrl}
				className={styles.beat_art}
			/>

			<div className={styles.sub_container}>
				<div className={styles.header}>
					<h1>{props.beat.name}</h1>
					<div className={styles.trending_icon}>
						<Image
							width="19"
							height="11"
							alt="trending icon"
							src="/trending.svg"
						/>
						<p>Trending</p>
					</div>
				</div>

				<div className={styles.producer}>
					{props.beat.producer?.image != undefined ? (
						""
					) : (
						<div className={styles.producer_icon}>T</div>
					)}
					<h2>Teepee</h2>
					<div className={styles.rating}>
						{[1, 2, 3, 4, 5].map((star) => (
							<Image
								width="17"
								height="17"
								alt="rating"
								src="/star.svg"
								key={star}
							/>
						))}
					</div>
				</div>

				<Player src={props.beat.audioSignedUrl} />

				<div className={styles.footer}>
					<div className={styles.footer_left}>
						<button className={styles.buy_now}>Buy Now</button>

						<div className={styles.save_beat_outer}>
							<div className={styles.save_beat_inner}>
								<p>Save Beat</p>
							</div>
						</div>

						<Image
							width="23"
							height="23"
							alt="price tag"
							src="/price_tag.svg"
						/>

						<p className={styles.text}>NGN. {setPrice(100000)}</p>

						<Image width="22" height="12" alt="license type" src="/key.svg" />

						<p className={styles.text}>Exclusive</p>

						<Image width="12" height="18" alt="genre" src="/treble_clef.svg" />

						<p className={styles.text}>Afrobeats</p>
					</div>

					<div className={styles.footer_right}>
						<p className={styles.subtext}>Uploaded March 31, 2023</p>
					</div>
				</div>
			</div>
		</div>
	);
}

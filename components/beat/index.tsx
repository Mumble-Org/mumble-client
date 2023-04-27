import styles from "./beat.module.css";
import Image from "next/image";
import { Player } from "../player";
import { useRouter } from "next/router";

export function Beat(props) {
	const router = useRouter();

	const setPrice = (price) => {
		const formattedInput = Number(price).toLocaleString();
		return formattedInput;
	};

	const openProducerProfile = () => {
		router.push(`/${props.beat.producer.name.replace(" ", "_")}`);
	}

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
						<p className={styles[props.type]}>
							{(() => {
								switch (props.type) {
									case "trending":
										return "Trending";
									case "popular":
										return "Popular";
								}
							})()}
						</p>
					</div>
				</div>

				<div className={styles.producer} onClick={openProducerProfile} >
					{props.beat.producer?.image != undefined ? (
						""
					) : (
						<div className={styles.producer_icon}>
							{props.beat.producer.imageUrl != "" ? (
								<Image
									width="40"
									height="40"
									alt="producer profile picture"
									src={props.beat.producer.imageUrl}
								/>
							) : (
								props.beat.producer.name.charAt(0).toUpperCase()
							)}
						</div>
					)}
					<h2>
						{props.beat.producer.name.charAt(0).toUpperCase() +
							props.beat.producer.name.slice(1)}
					</h2>
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

				<Player src={props.beat.audioSignedUrl} beatId={props.beat._id} />

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

						<p className={styles.text}>NGN. {setPrice(props.beat.price)}</p>

						<Image width="22" height="12" alt="license type" src="/key.svg" />

						<p className={styles.text}>
							{props.beat.license.charAt(0).toUpperCase() +
								props.beat.license.slice(1)}
						</p>

						<Image width="12" height="18" alt="genre" src="/treble_clef.svg" />

						<p className={styles.text}>
							{props.beat.genre.charAt(0).toUpperCase() +
								props.beat.genre.slice(1)}
						</p>
					</div>

					<div className={styles.footer_right}>
						<p className={styles.subtext}>
							Uploaded{" "}
							{new Date(props.beat.createdAt).toLocaleString("en-us", {
								month: "long",
								day: "numeric",
								year: "numeric",
							})}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

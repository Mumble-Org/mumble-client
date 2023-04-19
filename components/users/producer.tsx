import styles from "./producer.module.css";
import Image from "next/image";

export function Producer(props) {
	return (
		<div className={styles.container}>
			<Image
				width="320"
				height="320"
				alt="profile image"
				src="/test_image.svg"
				className={styles.profile_img}
			/>

			<h3 className={styles.title}>Beat God</h3>

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

			<div className={styles.subheading}>
				<div className={styles.subtitle}>
					<Image width='20' height='20' alt='beats' src='/beats.svg' />
					<p>Beats sold</p>
				</div>
				<div><p>200</p></div>
			</div>

			<div className={styles.subheading}>
				<div className={styles.subtitle}>
					<Image width='20' height='20' alt='beats' src='/rate.svg' />
					<p>Rate per song</p>
				</div>
				<div><p>NGN. 500,000</p></div>
			</div>

			<div className={styles.subheading}>
				<div className={styles.subtitle}>
					<Image width='20' height='20' alt='beats' src='/location.svg' />
					<p>Location</p>
				</div>
				<div><p>Mushin</p></div>
			</div>

			<div className={styles.view_profile}>
				<p>View Profile</p>
			</div>
		</div>
	);
}

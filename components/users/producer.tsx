import styles from "./producer.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";

export function Producer(props) {
	const { user } = props;
	console.log(user);

	const [userRating, setUserRating] = useState([]);

	useEffect(() => {
		if (user) {
			// Change later
			const rating = genRating(user.rating || 5);
			setUserRating(rating);
		}
	}, []);

	return (
		<div className={styles.container}>
			{user.img ? (
				<Image
					width="320"
					height="320"
					alt="profile image"
					src={user.img}
					className={styles.profile_img}
				/>
			) : (
				<div className={`${styles.profile_img} ${styles.profile_txt}`}>
					<p>{user.name.charAt(0).toUpperCase()}</p>
				</div>
			)}

			<h3 className={styles.title}>{user.name}</h3>

			<div className={styles.rating}>{userRating}</div>

			<div className={styles.subheading}>
				<div className={styles.subtitle}>
					<Image width="20" height="20" alt="beats" src="/beats.svg" />
					<p>Beats sold</p>
				</div>
				<div>
					<p>{user.beats_sold}</p>
				</div>
			</div>

			<div className={styles.subheading}>
				<div className={styles.subtitle}>
					<Image width="20" height="20" alt="beats" src="/upload.svg" />
					<p>Beats uploaded</p>
				</div>
				<div>
					<p>{user.beats_uploaded}</p>
				</div>
			</div>

			<div className={styles.subheading}>
				<div className={styles.subtitle}>
					<Image width="20" height="20" alt="beats" src="/location.svg" />
					<p>Location</p>
				</div>
				<div>
					<p>{(user.location && user.location.split(", ")[0]) || "-"}</p>
				</div>
			</div>

			<div className={styles.view_profile}>
				<p>View Profile</p>
			</div>
		</div>
	);
}

const genRating = (rating: number) => {
	const ratings: Array<any> = [];
	for (let i: number = 0; i < rating; i++) {
		ratings.push([
			<div className={styles.rate} key={i}>
				<Image src="/star.svg" alt="rating" height="17" width="17" />
			</div>,
		]);
	}

	return ratings;
};

{
	/* <div className={styles.container}>
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
					<Image width='20' height='20' alt='beats' src='/upload.svg' />
					<p>Beats uploaded</p>
				</div>
				<div><p>2,000</p></div>
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
		</div> */
}

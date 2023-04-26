import styles from "./engineer.module.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export function Engineer(props) {
	const [userRating, setUserRating] = useState([]);
	const { user } = props;

	useEffect(() => {
		const rating = genRating(user.rating);
		setUserRating(rating);
	}, []);

	return (
		<div className={styles.container}>
			{user.imageUrl && user.imageUrl != "" ? (
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
					<Image width="20" height="20" alt="beats" src="/mixer.svg" />
					<p>Songs mixed</p>
				</div>
				<div>
					<p>{user.songs_mixed}</p>
				</div>
			</div>

			<div className={styles.subheading}>
				<div className={styles.subtitle}>
					<Image width="20" height="20" alt="beats" src="/rate.svg" />
					<p>Rate per song</p>
				</div>
				<div>
					<p>NGN. {user.rate.toLocaleString()}</p>
				</div>
			</div>

			<div className={styles.subheading}>
				<div className={styles.subtitle}>
					<Image width="20" height="20" alt="beats" src="/location.svg" />
					<p>Location</p>
				</div>
				<div>
					<p>{(user.location && user.location.split(" ")[0]) || "Lagos"}</p>
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
				<Image src="/star.svg" alt="rating" height="16" width="17" />
			</div>,
		]);
	}

	return ratings;
};

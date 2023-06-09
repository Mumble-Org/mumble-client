import styles from "./producer.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export function Producer(props) {
	const router = useRouter();
	const { user } = props;

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
			{user.imageUrl && user.imageUrl != "" ? (
				<Image
					width="320"
					height="320"
					alt="profile image"
					src={user.imageUrl}
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

			<div className={styles.view_profile} onClick={() => {
				const username = user.name.toString().replace(" ", "_");
				router.push({pathname: `/[username]`, query: {username: `${username}`}});
				}
				}>
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

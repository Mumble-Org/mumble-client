import React, { useEffect, useState } from "react";

import Image from "next/image";
import { Reviews } from "./reviews";
import { SongsProduced } from "./songsProduced";
import UploadedBeats from "./uploadedBeats";
import styles from "./profile.module.css";

export const Profile = (props) => {
	const { user } = props;
	const [userRating, setUserRating] = useState([]);
	const [scene, setScene] = useState("uploaded_beats");

	useEffect(() => {
		const rating = genRating(user.ratings || 5);
		setUserRating(rating);
	}, []);

	const handleClick = (e) => {
		setScene(e.target.id);
	};

	return (
		<div className={styles.container}>
			<div className={styles.profileImage}>
				{!user.imageUrl ? (
					<div className={styles.profileImage_name}>
						{user.name?.charAt(0).toUpperCase()}
					</div>
				) : (
					<center>
						<Image
							src={user.imageUrl}
							alt={user.name}
							width="264"
							height="264"
						/>
					</center>
				)}
			</div>

			<div className={styles.producerDetails}>
				<div className={styles.userName}>
					<center>
						{user.name?.charAt(0).toUpperCase() + user.name?.slice(1)}
					</center>
				</div>

				<div className={styles.type}>
					<center>
						{user.type?.charAt(0).toUpperCase() + user.type?.slice(1)}
					</center>
				</div>

				<div className={styles.location}>
					<Image
						src="/location-profile.svg"
						alt="location"
						width="16"
						height="18"
						className={styles.locationImg}
					/>
					{user.location?.split(", ")[0] || "-"}
				</div>
				<div className={styles.rating}>{userRating}</div>

				<div className={styles.info}>
					<div className={styles.infoChild}>
						<Image src="/divisor.svg" alt="beats sold" width="20" height="20" />
						<div className={styles.title}>Beats Sold</div>
						{user.beats_sold}
					</div>

					<div className={styles.infoChild}>
						<Image
							src="/upload.svg"
							alt="beats uploaded"
							width="20"
							height="20"
						/>
						<div className={styles.title}>Beats Uploaded</div>
						{user.beats_uploaded}
					</div>

					<div className={styles.infoChild}>
						<Image src="/mail.svg" alt="email" width="20" height="20" />
						<div className={styles.title}>Email Address</div>
						{user.email}
					</div>
					<div className={styles.infoChild}>
						<Image src="/phone.svg" alt="phone number" width="20" height="20" />
						<div className={styles.title}>Phone Number</div>
						{user.phone_number || "-"}
					</div>
				</div>
			</div>

			<div className={styles.userContent}>
				<div
					className={`${
						scene == "uploaded_beats"
							? styles.activeUserContentChild
							: styles.userContentChild
					}`}
					id="uploaded_beats"
					onClick={handleClick}
				>
					Uploaded Beats
					<hr />
				</div>
				<div
					className={`${
						scene == "songs_produced"
							? styles.activeUserContentChild
							: styles.userContentChild
					}`}
					id="songs_produced"
					onClick={handleClick}
				>
					Songs Produced
					<hr />
				</div>
				<div
					className={`${
						scene == "reviews"
							? styles.activeUserContentChild
							: styles.userContentChild
					}`}
					id="reviews"
					onClick={handleClick}
				>
					Reviews
					<hr />
				</div>
			</div>
			<SubScene id={user._id} scene={scene} user={user} />
		</div>
	);
};

function SubScene(props) {
	const { scene, id, user } = props;

	if (scene == "uploaded_beats") {
		return <UploadedBeats id={id} />;
	} else if (scene == "songs_produced") {
		return <div style={{ margin: "20px" }}><SongsProduced user={user} /></div>;
	} else {
		return <div><Reviews user={user}/></div>;
	}
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

import { Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import styles from "./reviews.module.scss";

export const Reviews = (props) => {
	const { user } = props;
	const [reviews, setReviews] = useState(["rating", "rating"]);
	const [userRating, setUserRating] = useState([]);
	const [reviewRating, setReviewRating] = useState([]);
	const [review, setReview] = useState("");

	useEffect(() => {
		const rating = genRating(5);
		const reviewRate = genreviewRating(5);
		setUserRating(rating);
		setReviewRating(reviewRate);
	}, []);

	/**
	 * Handle Review State
	 */
	const handleReview = (e) => {
		const input = e.target.value;
		setReview(input);
	};

	return (
		<Stack className={styles.reviews}>
			<Stack className={styles.reviewTop}>
				<Typography variant="h3" className={styles.reviewsT}>
					Leave a review for{" "}
					{user?.name.charAt(0).toUpperCase() + user.name.slice(1)}
				</Typography>

				<textarea
					className={styles.reviewInput}
					placeholder="Drop a comment about Sam and their work"
					onChange={handleReview}
				/>

				<Stack direction="row" className={styles.rates}>
					<div>
						Rate {user?.name.charAt(0).toUpperCase() + user.name.slice(1)}:
					</div>

					<Stack direction="row" className={styles.reviewRating}>
						{userRating}
					</Stack>
				</Stack>

				<Button
					disabled={review === "" ? true : false}
					className={`${styles.reviewButton} ${
						review !== "" ? styles.reviewButtonActive : ""
					}`}
				>
					Post review
				</Button>
			</Stack>

			<Stack className={styles.reviewBottom}>
				<Typography variant="h2" className={styles.heading}>
					Other Reviews
				</Typography>

				<Stack className={styles.UsersReview}>
					{reviews.map((review) => {
						return (
							<Stack key={Date.now()} className={styles.mainReview}>
								<Stack className={styles.review}>
									<Stack direction="row" className={styles.reviewHeading}>
										<Image
											src="/reviewpic.svg"
											alt="cover art"
											height={40}
											width={40}
											className={styles.reviewerImage}
										/>

										<Typography variant="h4" className={styles.songProducer}>
											Jane Doe
										</Typography>
									</Stack>

									<Stack direction="row" className={styles.reviewerRating}>
										{reviewRating}
									</Stack>

									<Typography className={styles.reviewText}>
										He's Awesome
									</Typography>
								</Stack>

								<Button className={styles.reply}>Reply</Button>
							</Stack>
						);
					})}
				</Stack>
			</Stack>
		</Stack>
	);
};

const genRating = (rating: number) => {
	const ratings: Array<any> = [];
	for (let i: number = 0; i < rating; i++) {
		ratings.push([
			<div className={styles.rate} key={i}>
				<Image
					src="/star-unfilled.svg"
					alt="rating"
					height={48}
					width={29}
					className={styles.star}
				/>
			</div>,
		]);
	}

	return ratings;
};

const genreviewRating = (rating: number) => {
	const ratings: Array<any> = [];
	for (let i: number = 0; i < rating; i++) {
		ratings.push([
			<div className={styles.reviewRate} key={i}>
				<Image src="/star.svg" alt="rating" height="18" width="17" />
			</div>,
		]);
	}

	return ratings;
};

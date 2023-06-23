import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import styles from "./reviews.module.scss";
import { useSelector } from "react-redux";

export const Reviews = (props) => {
	const { user } = props;
	const [reviews, setReviews] = useState(user.reviews);
	const [userRating, setUserRating] = useState([]);
	const [reviewRating, setReviewRating] = useState(0);
	const [review, setReview] = useState("");
	const userState = useSelector((state: any) => state.user);
	const token = userState.token;
	const [error, setError] = useState(false);

	useEffect(() => {
		const rating = genRating(5);
	}, []);

	/**
	 * Handle Review State
	 */
	const handleReview = (e) => {
		const input = e.target.value;
		setReview(input);
	};

	useEffect(() => {
		// Set rating when user clicks
		setUserRating(genReviewRating(reviewRating));
	}, [reviewRating]);

	const genReviewRating = (rating: number) => {
		const ratings: Array<any> = [];
		const setRating = (e) => {
			setReviewRating(e.currentTarget.value);
		};

		// fill
		let i: number = 0;
		for (i; i < 5; i++) {
			if (i < rating) {
				ratings.push([
					<Button
						className={styles.rate}
						key={i}
						value={i + 1}
						style={{
							padding: 0,
							maxWidth: "16px",
							minWidth: "16px",
						}}
						onClick={setRating}
					>
						<Image
							src="/star.svg"
							alt="rating"
							height={48}
							width={29}
							className={styles.star}
						/>
					</Button>,
				]);
			} else {
				ratings.push([
					<Button
						className={styles.rate}
						key={i}
						value={i + 1}
						style={{
							padding: 0,
							maxWidth: "16px",
							minWidth: "16px",
						}}
						onClick={setRating}
					>
						<Image
							src="/star-unfilled.svg"
							alt="rating"
							height={48}
							width={29}
							className={styles.star}
						/>
					</Button>,
				]);
			}
		}

		return ratings;
	};

	const submitReview = () => {
		if (!token) setError(true);
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
						console.log(review);
						return (
							<Stack key={review._id} className={styles.mainReview}>
								<Stack className={styles.review}>
									<Stack direction="row" className={styles.reviewHeading}>
										{review.reviewer.imageUrl &&
										review.reviewer.imageUrl != "" ? (
											<Image
												src={review.reviewer.imageUrl}
												alt="profile image"
												height={40}
												width={40}
												className={styles.reviewerImage}
											/>
										) : (
											<Box className={styles.reviewerImageText}>
												{review.reviewer.name.charAt(0).toUpperCase()}
											</Box>
										)}

										<Typography variant="h4" className={styles.songProducer}>
											{review.reviewer.name.charAt(0).toUpperCase() +
												review.reviewer.name.slice(1)}
										</Typography>
									</Stack>

									<Stack direction="row" className={styles.reviewerRating}>
										{genRating(review.rating)}
									</Stack>

									<Typography className={styles.reviewText}>
										{review.text}
									</Typography>
								</Stack>

								{/* <Button className={styles.reply}>Reply</Button> */}
							</Stack>
						);
					})}
				</Stack>
			</Stack>

			{error ? (
				<Alert
					severity="error"
					sx={{ position: "fixed", top: "96px", right: "48px" }}
					onClose={() => setError(false)}
				>
					You have to be logged in to review a user!!!
				</Alert>
			) : null}
		</Stack>
	);
};

const genRating = (rating: number) => {
	const ratings: Array<any> = [];

	// fill
	let i: number = 0;
	for (i; i < 5; i++) {
		if (i < rating) {
			ratings.push([
				<div className={styles.rate} key={i}>
					<Image
						src="/star.svg"
						alt="rating"
						height={48}
						width={29}
						className={styles.star}
					/>
				</div>,
			]);
		} else {
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
	}

	return ratings;
};

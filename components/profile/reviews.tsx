import React, { useState, useEffect } from 'react';
import styles from './profile.module.css';
import Image from 'next/image';

export const Reviews = (props) => {
  const { user } = props;
  const [reviews, setReviews] = useState(["rating", "rating"]);
  const [userRating, setUserRating] = useState([]);
  const [reviewRating, setReviewRating] = useState([]);

  	useEffect(() => {
		const rating = genRating(5);
    const reviewRate = genreviewRating(5);
		setUserRating(rating);
    setReviewRating(reviewRate);
	}, []);


  useEffect(() => {
    async function fetchSongs() {
      // const response = await backend(`/users/`);
      // setSongs(response.data);
    };
  }, []);
  return (
    <div className={styles.reviews}>
      <div className={styles.reviewTop}>
        <h3 className={styles.reviewsT}>
          Leave a review for {user?.name}
        </h3>
        <input  className={styles.reviewInput} type="text" 
        placeholder='Drop a comment about Sam and their work'/>
        <div className={styles.rates}>
          <div>
            Rate {user?.name}: 
          </div>
          <div className={styles.reviewRating}>{userRating}</div>
        </div>
        <button className={styles.reviewButton}>Post review</button>
      </div>
      <div className={styles.reviewBottom}>
        <h2>
        Other Reviews
        </h2>
        <div className={styles.UsersReview}>
          {reviews.map((review) => {
            return (
              <div className={styles.mainReview}>
                <div className={styles.review}>
                  <div className={styles.reviewItems}>
                    <div className={styles.reviewLeft}>
                        <Image src='/reviewpic.svg' 
                            alt='cover art' 
                            height={40} 
                            width={40}
                            className={styles.reviewerImage} />
                      <div className={styles.songProducer}>Jane Doe</div>
                    </div>
                    <div className={styles.reviewerRating}>{reviewRating}</div>
                    <div className={styles.reviewText}>He's Awesome</div>
                  </div>
                </div>
                <div className={styles.reply}>Reply</div>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

const genRating = (rating: number) => {
	const ratings: Array<any> = [];
	for (let i: number = 0; i < rating; i++) {
		ratings.push([
			<div className={styles.rate} key={i}>
				<Image src="/star-unfilled.svg" alt="rating" height={48} width={29}
        className={styles.star} />
			</div>
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
			</div>
		]);
	}

	return ratings;
};
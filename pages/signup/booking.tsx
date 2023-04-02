import styles from "../../styles/signup/details.module.css";
import { ActiveCarousel, InactiveCarousel } from "../../components/carousels";
import Image from "next/image";

// redux
import { set } from "../../redux/actions/signup";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { Back } from "../../components/back";
import { ActiveContinue } from "../../components/continue";

export default function Booking() {
  const dispatch = useDispatch();
  const [calendar, setCalendar] = useState();
  
  const handleCalendar = (e) => {
    const link = e.target.value;
    dispatch(set('signup_calendar', link));
  }

  const handlePhoneNumber = (e) => {
    const phone = e.target.value;
    dispatch(set('signup_phone_number', phone));
  }

	return (
		<div className={styles.container}>
			<h1 className={styles.header}>Add your booking information</h1>

			<div className={styles.carousel}>
				<InactiveCarousel />
				<InactiveCarousel />
				<InactiveCarousel />
				<ActiveCarousel />
				<InactiveCarousel />
			</div>

			<h2 className={styles.portfolio_subheader}>
				Add your studio location and connect a calendar to get studio bookings
				if you offer recording services{" "}
			</h2>

			<div className={styles.infos_container}>
				{/* location */}
				<div className={styles.info_container}>
					<label htmlFor="input" className={styles.info_label}>
						Add studio location
					</label>
					<div className={styles.info_input_div}>
						<Image src="/location.svg" alt="location" width="14" height="20" />
						<input
							className={styles.info_input}
							name="input"
							placeholder="Enter your location"
						></input>
					</div>
				</div>

				{/* calendar */}
				<div className={styles.info_container}>
					<label htmlFor="input" className={styles.info_label}>
						Add your calendar link
					</label>
					<div className={styles.info_input_div}>
            <input
              onChange={handleCalendar}
							className={styles.info_input}
							name="input"
							placeholder="Enter your calendar link"
						></input>
					</div>
				</div>

				{/* phone number */}
				<div className={styles.info_container}>
					<label htmlFor="input" className={styles.info_label}>
						Add your phone number
					</label>
					<div className={styles.info_input_div}>
            <input
              onChange={handlePhoneNumber}
							className={styles.info_input}
							name="input"
							placeholder="+2347080001111"
						></input>
					</div>
				</div>
			</div>

			<div className={styles.next_page}>
				<Back href="/signup/portfolio" />
				<ActiveContinue href="/signup/upload" />
			</div>
		</div>
	);
}

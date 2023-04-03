import styles from "../../styles/signup/details.module.css";
import { ActiveCarousel, InactiveCarousel } from "../../components/carousels";
import { Back } from "../../components/back";
import { ActiveContinue } from "../../components/continue";
import Image from "next/image";

import { getCitySuggestions } from "../../utils/getCities";

// redux
import { set } from "../../redux/actions/signup";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function Booking() {
  const dispatch = useDispatch();
  const [locationText, setLocationText] = useState('');
	const [location, setLocation] = useState("");
	const [locations, setLocations] = useState([]);
  const [open, setOpen] = useState(true);
  

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (locationText && open) {
				setOpen(true);
				getCitySuggestions(locationText).then((locations) =>
					setLocations(locations)
				);
			} else {
        setOpen(false);
        setLocations([]);
			}
		}, 2000);

    return () => {
      clearTimeout(timeOut);
    }
	}, [locationText]);

	const handleCalendar = (e) => {
		const link = e.target.value;
		dispatch(set("signup_calendar", link));
	};

	const handlePhoneNumber = (e) => {
		const phone = e.target.value;
		dispatch(set("signup_phone_number", phone));
	};

	const handleLocation = (e) => {
    let text = e.target.value;
    if (text) {
      setOpen(true);
    } else {
      setOpen(false);
    }
    setLocationText(text);
	};

  const handleSelectLocation = (e) => {
    let text =e.target.value;
    setLocation(text);
    setLocationText(text);
    dispatch(set("signup_location", text));
		setOpen(false);
	};

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
							onChange={handleLocation}
							className={styles.info_input}
							name="input"
							placeholder="Enter your location"
							value={locationText}
						></input>
					</div>
				</div>

				{open ? (
					<ul className={styles.location_select}>
						{locations.map((loc) => (
							<div className={styles.location_object} key={loc}>
								<Image
									src="/location_black.svg"
									alt={loc}
									width="14"
									height="20"
								/>
								<option key={loc} value={loc} onClick={handleSelectLocation}>
									{loc}
								</option>
							</div>
						))}
					</ul>
				) : (
					""
				)}

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

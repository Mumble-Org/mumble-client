import styles from "../../styles/signup/details.module.css";
import {
	ActiveCarousel,
	InactiveCarousel,
} from "../../components/carousels/carousels";
import { Back } from "../../components/buttons/back";
import {
	ActiveContinue,
	ActiveFinish,
} from "../../components/buttons/continue";
import Image from "next/image";
import { useRouter } from "next/router";
import { backend } from "../../utils/backend";
import { Loading } from "../../components/loading";

import { getCitySuggestions } from "../../utils/getCities";

// redux
import { set } from "../../redux/actions/signup";
import { set as userSet } from "../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Booking() {
	const type = useSelector((state: any) => state.signup.user.type);
	const user = useSelector((state: any) => state.signup.user);
	const router = useRouter();
	const dispatch = useDispatch();
	const [location, setLocation] = useState("");
	const [locations, setLocations] = useState([]);
	const [open, setOpen] = useState(true);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const timeOut = setTimeout(() => {
			if (location && open) {
				setOpen(true);
				getCitySuggestions(location).then((locations) =>
					setLocations(locations)
				);
			} else {
				setOpen(false);
				setLocations([]);
			}
		}, 2000);

		return () => {
			clearTimeout(timeOut);
		};
	}, [location, open]);

	const signup = async () => {
		setLoading(true);
		const body = { ...user };
		body.genres = body.genres?.split(", ");
		body.portfolio = body.portfolio?.split(", ");

		const response = await backend.post("/users/signup", body);

		if (response.status === 201) {
			dispatch(userSet("user", response.data.user));
			dispatch(userSet("token", response.data.token));
			if (body.type === "engineer") {
				router.push("/");
			} else {
				router.push("/signup/upload");
			}
		} else {
			router.push("/signup");
		}
		setLoading(false);
	};

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
		setLocation(text);
	};

	const handleSelectLocation = (e) => {
		let text = e.target.value;
		setLocation(text);
		dispatch(set("signup_location", text));
		setOpen(false);
	};

	return (
		<div className={styles.container} style={loading ? { padding: 0 } : {}}>
			{loading ? <Loading /> : ""}
			<h1 className={styles.header}>Add your booking information</h1>

			<div className={styles.carousel}>
				<InactiveCarousel />
				<InactiveCarousel />
				<InactiveCarousel />
				<ActiveCarousel />
				{type === "producer" ? <InactiveCarousel /> : ""}
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
							value={location}
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
				{type === "producer" ? (
					<ActiveContinue onClick={signup} />
				) : (
					<ActiveFinish onClick={signup} />
				)}
			</div>
		</div>
	);
}

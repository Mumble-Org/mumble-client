import styles from "./details.module.css";
import locationStyles from "../../styles/signup/details.module.css";
import { genres, Genre } from "../genres";
import { InactiveFinish, ActiveFinish } from "../continue";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { getCitySuggestions } from "../../utils/getCities";
import { set } from "../../redux/actions/signup";

export function Artist() {
	const dispatch = useDispatch();
	const [genresCount, setGenresCount] = useState(0);
	const [location, setLocation] = useState("");
	const [locations, setLocations] = useState([]);
	const [open, setOpen] = useState(true);

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
	}, [location]);

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
		<div className={styles.container}>
			<h2 className={styles.header}>What genre(s) of music do you make?</h2>

			<div className={styles.genres}>
				{genres.map((genre) => (
					<Genre
						key={genre}
						text={genre}
						count={genresCount}
						set={setGenresCount}
					/>
				))}
			</div>

			<h3 className={styles.artist_location}>Where are you located?</h3>
			<div
				className={locationStyles.infos_container}
				style={{
					margin: "0",
				}}
			>
				{/* location */}
				<div className={locationStyles.info_container}>
					<label htmlFor="input" className={locationStyles.info_label}>
						Add your location
					</label>
					<div className={locationStyles.info_input_div}>
						<Image src="/location.svg" alt="location" width="14" height="20" />
						<input
							onChange={handleLocation}
							className={locationStyles.info_input}
							name="input"
							placeholder="Enter your location"
							value={location}
						></input>
					</div>
				</div>

				{open ? (
					<ul
						className={locationStyles.location_select}
						style={{
							top: "55%",
						}}
					>
						{locations.map((loc) => (
							<div className={locationStyles.location_object} key={loc}>
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

				<div className={styles.continue}>
					{genresCount ? <ActiveFinish href="" /> : <InactiveFinish />}
				</div>
			</div>
		</div>
	);
}

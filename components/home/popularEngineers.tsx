import styles from "./popularEngineers.module.css";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { backend } from "../../utils/backend";
import { getCitySuggestions } from "../../utils/getCities";
import { Engineer } from "../users/engineer";
import { ThreeDots } from "react-loader-spinner";

export function PopularEngineersHome(props) {
	const [location, setLocation] = useState("");
	const [locations, setLocations] = useState([]);
	const [open, setOpen] = useState(true);
	const [loading, setLoading] = useState(false);
	const [engineers, setEngineers] = useState([]);

	useEffect(() => {
		// Fetch popular beats from backend
		async function fetchEngineers() {
			setLoading(true);
			try {
				const response = await backend.get("/users/engineers/?page=1&limit=24");
				setEngineers(response.data.engineers);
			} catch (err) {
				console.log(err);
			}
			setLoading(false);
		}
		fetchEngineers();
	}, []);

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
		setOpen(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3>Popular Sound Engineers</h3>

				<div className={styles.location}>
					<Image src="/location.svg" alt="location" width="14" height="20" />
					<input
						onChange={handleLocation}
						className={""}
						name="input"
						placeholder="Sort by location"
						value={location}
					></input>
				</div>

				{open ? (
					<ul
						className={styles.location_select}
					>
						{locations.map((loc) => (
							<div className={styles.location_option} key={loc}>
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
			</div>

			{loading ? (
				<ThreeDots
					height="64"
					width="64"
					color="#febfff"
					wrapperClass="loader"
				/>
			) : (
				""
			)}

			<div className={styles.producers}>
				{engineers && engineers.map((engineer) => {
					return <Engineer user={engineer} key={engineer._id} />
				})}
			</div>

			<div className={styles.view_more_outer}>
				<div className={styles.view_more_inner}>
					<p>Discover More Sound Engineers</p>
				</div>
			</div>
		</div>
	);
}

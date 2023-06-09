import { getItem, setItem } from "../../utils/cache";
import { useEffect, useRef, useState } from "react";

import { Beat } from "../beat";
import Image from "next/image";
import { Stack } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";
import { backend } from "../../utils/backend";
import { genres } from "../genres";
import styles from "./trendingBeats.module.css";

export function TrendingBeatsHome(props) {
	const [priceOpen, setPriceOpen] = useState(false);
	const [priceFilter, setPriceFilter] = useState("Any price");
	const [genresOpen, setGenresOpen] = useState(false);
	const [genresFilter, setGenresFilter] = useState("All genres");
	const [trendingBeats, setTrendingBeats] = useState([]);
	const [loading, setLoading] = useState(false);

	const ClickOutside = (props) => {
		const ref = useRef(null);

		useEffect(() => {
			const handleClickOutside = (event) => {
				if (ref.current && !ref.current.contains(event.target)) {
					// The click was outside the component, do something
					props.set(false);
				}
			};

			document.addEventListener("mousedown", handleClickOutside);

			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [props, ref]);

		return (
			<div style={{ cursor: "pointer" }} ref={ref}>
				{props.children}
			</div>
		);
	};

	useEffect(() => {
		// Fetch trending beats from backend
		// Cache result as cookies for 5 minutes
		async function fetchBeats() {
			setLoading(true);
			let beats = getItem("TrendingBeatsHome");

			if (beats === undefined || !beats) {
				try {
					const response = await backend.get(
						`/beats/trending?page=1&limit=3&genre=${
							genresFilter === "All genres"
								? genresFilter
								: genresFilter.toLowerCase()
						}&price=${priceFilter}`
					);

					setTrendingBeats(response.data.beats);
					// Set cookies to expire after 5 minutes
					setItem("TrendingBeatsHome", response.data.beats);
				} catch (err) {
					setTrendingBeats([]);
					console.log(err);
				}
			} else {
				setTrendingBeats(beats);
			}

			setLoading(false);
		}
		fetchBeats();
	}, [genresFilter, priceFilter]);

	const handlePriceOpen = () => {
		setPriceOpen(!priceOpen);
	};

	const handlePriceFilter = (e) => {
		const value = e.target.value;
		setPriceOpen(false);
		setPriceFilter(value);
	};

	const handleGenresOpen = () => {
		setGenresOpen(!genresOpen);
	};

	const handleGenresFilter = (e) => {
		const value = e.target.value;
		setGenresOpen(false);
		setGenresFilter(value);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3>Trending beats</h3>

				<div className={styles.filter}>
					<ClickOutside set={setPriceOpen}>
						<div className={styles.filter_object}>
							<div
								className={styles.filter_container}
								onClick={handlePriceOpen}
							>
								<div className={styles.filter_background}>
									<p>{priceFilter}</p>
									<Image
										src={
											priceOpen
												? "/up_arrow_gradient.svg"
												: "/down_arrow_gradient.svg"
										}
										alt="select price"
										width="19"
										height="11"
									/>
								</div>
							</div>

							{priceOpen ? (
								<div className={styles.dropdown}>
									<option value="Any price" onClick={handlePriceFilter}>
										Any price
									</option>
									<option value="Lowest first" onClick={handlePriceFilter}>
										Lowest first
									</option>
									<option value="Highest first" onClick={handlePriceFilter}>
										Highest first
									</option>
								</div>
							) : (
								""
							)}
						</div>
					</ClickOutside>

					<ClickOutside set={setGenresOpen}>
						<div className={styles.filter_object}>
							<div
								className={styles.filter_container}
								onClick={handleGenresOpen}
							>
								<div className={styles.filter_background}>
									<p>{genresFilter}</p>
									<Image
										src={
											genresOpen
												? "/up_arrow_gradient.svg"
												: "/down_arrow_gradient.svg"
										}
										alt="select price"
										width="19"
										height="11"
									/>
								</div>
							</div>

							{genresOpen ? (
								<div className={styles.dropdown}>
									<option value="All genres" onClick={handleGenresFilter}>
										All genres
									</option>
									{genres.map((genre) => {
										return (
											<option
												value={genre}
												onClick={handleGenresFilter}
												key={genre}
											>
												{genre}
											</option>
										);
									})}
								</div>
							) : (
								""
							)}
						</div>
					</ClickOutside>
				</div>
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

			<Stack className={styles.beats_container}>
				{trendingBeats.map((beat) => {
					return <Beat beat={beat} key={beat._id} type="trending" />;
				})}
			</Stack>

			<div
				className={styles.view_more_outer}
				onClick={() => props.setPosition("trending")}
			>
				<div className={styles.view_more_inner}>
					<p>View More Trending Beats</p>
				</div>
			</div>
		</div>
	);
}

export function TrendingBeats(props) {
	const [priceOpen, setPriceOpen] = useState(false);
	const [priceFilter, setPriceFilter] = useState("Any price");
	const [genresOpen, setGenresOpen] = useState(false);
	const [genresFilter, setGenresFilter] = useState("All genres");
	const [trendingBeats, setTrendingBeats] = useState([]);
	const [loading, setLoading] = useState(false);

	const ClickOutside = (props) => {
		const ref = useRef(null);

		useEffect(() => {
			const handleClickOutside = (event) => {
				if (ref.current && !ref.current.contains(event.target)) {
					// The click was outside the component, do something
					props.set(false);
				}
			};

			document.addEventListener("mousedown", handleClickOutside);

			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [props, ref]);

		return (
			<div style={{ cursor: "pointer" }} ref={ref}>
				{props.children}
			</div>
		);
	};

	useEffect(() => {
		// Fetch trending beats from backend
		// Cache results for 5 minutes
		async function fetchBeats() {
			setLoading(true);
			let beats = getItem("TrendingBeats");

			if (beats === undefined || !beats) {
				try {
					const response = await backend.get(
						`/beats/trending/?page=1&limit=24&genre=${
							genresFilter === "All genres"
								? genresFilter
								: genresFilter.toLowerCase()
						}&price=${priceFilter}`
					);

					setTrendingBeats(response.data.beats);
					// Cache for 5 minutes
					setItem("TrendingBeats", response.data.beats);
				} catch (err) {
					setTrendingBeats([]);
					console.log(err);
				}
			} else {
				setTrendingBeats(beats);
			}

			setLoading(false);
		}
		fetchBeats();
	}, [genresFilter, priceFilter]);

	const handlePriceOpen = () => {
		setPriceOpen(!priceOpen);
	};

	const handlePriceFilter = (e) => {
		const value = e.target.value;
		setPriceOpen(false);
		setPriceFilter(value);
	};

	const handleGenresOpen = () => {
		setGenresOpen(!genresOpen);
	};

	const handleGenresFilter = (e) => {
		const value = e.target.value;
		setGenresOpen(false);
		setGenresFilter(value);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3>All trending beats</h3>

				<div className={styles.filter}>
					<ClickOutside set={setPriceOpen}>
						<div className={styles.filter_object}>
							<div
								className={styles.filter_container}
								onClick={handlePriceOpen}
							>
								<div className={styles.filter_background}>
									<p>{priceFilter}</p>
									<Image
										src={
											priceOpen
												? "/up_arrow_gradient.svg"
												: "/down_arrow_gradient.svg"
										}
										alt="select price"
										width="19"
										height="11"
									/>
								</div>
							</div>

							{priceOpen ? (
								<div className={styles.dropdown}>
									<option value="Any price" onClick={handlePriceFilter}>
										Any price
									</option>
									<option value="Lowest first" onClick={handlePriceFilter}>
										Lowest first
									</option>
									<option value="Highest first" onClick={handlePriceFilter}>
										Highest first
									</option>
								</div>
							) : (
								""
							)}
						</div>
					</ClickOutside>

					<ClickOutside set={setGenresOpen}>
						<div className={styles.filter_object}>
							<div
								className={styles.filter_container}
								onClick={handleGenresOpen}
							>
								<div className={styles.filter_background}>
									<p>{genresFilter}</p>
									<Image
										src={
											genresOpen
												? "/up_arrow_gradient.svg"
												: "/down_arrow_gradient.svg"
										}
										alt="select price"
										width="19"
										height="11"
									/>
								</div>
							</div>

							{genresOpen ? (
								<div className={styles.dropdown}>
									<option value="All genres" onClick={handleGenresFilter}>
										All genres
									</option>
									{genres.map((genre) => {
										return (
											<option
												value={genre}
												onClick={handleGenresFilter}
												key={genre}
											>
												{genre}
											</option>
										);
									})}
								</div>
							) : (
								""
							)}
						</div>
					</ClickOutside>
				</div>
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

			<Stack className={styles.beats_container}>
				{trendingBeats.map((beat) => {
					return <Beat beat={beat} key={beat._id} type="trending" />;
				})}
			</Stack>
		</div>
	);
}

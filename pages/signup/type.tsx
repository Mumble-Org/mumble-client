import styles from "../../styles/signup/details.module.css";
import { ActiveCarousel, InactiveCarousel } from "../../components/carousels";
import Image from "next/image";

// redux
import { set } from "../../redux/actions/signup";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

// components
import { Producer } from "../../components/signup/producer";
import { Artist } from "../../components/signup/artist";
import { Engineer } from "../../components/signup/engineer";

import { resetGenresList } from "../../components/genres";

export default function Type() {
	const dispatch = useDispatch();
	const [type, setType] = useState("producer");

	useEffect(() => {
		dispatch(set("signup_type", type));
	}, []);

	const setProducer = () => {
		setType("producer");
		dispatch(set("signup_type", "producer"));
	};

	const setArtist = () => {
		setType("artist");
		dispatch(set("signup_type", "artist"));
	};

	const setEngineer = () => {
		setType("engineer");
		dispatch(set("signup_type", "engineer"));
	};

	const handleType = () => {
		resetGenresList();
		switch (type) {
			case "producer":
				return <Producer />;
			case "artist":
				return <Artist />;
			case "engineer":
				return <Engineer />;
		}
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.header}>Tell us a bit more about you</h1>

			<div className={styles.carousel}>
				<InactiveCarousel />
				<ActiveCarousel />
				{type !== "artist" ? <InactiveCarousel /> : ""}
				{type !== "artist" ? <InactiveCarousel /> : ""}
				{type === "producer" ? <InactiveCarousel /> : ""}
			</div>

			<h2 className={styles.subheader}>What brings you here?</h2>

			<div className={styles.type_container}>
				<div
					onClick={setProducer}
					className={`${styles.type_box} ${
						type === "producer"
							? styles.type_box_active
							: styles.type_box_inactive
					}`}
				>
					<Image
						src={
							type === "producer" ? "/checked_box.svg" : "/unchecked_box.svg"
						}
						alt={type === "producer" ? "unchecked box" : "checked box"}
						width="18"
						height="18"
					/>
					<p>I am a producer looking to sell my beats</p>
				</div>

				<div
					onClick={setArtist}
					className={`${styles.type_box} ${
						type === "artist"
							? styles.type_box_active
							: styles.type_box_inactive
					}`}
				>
					<Image
						src={type === "artist" ? "/checked_box.svg" : "/unchecked_box.svg"}
						alt={type === "artist" ? "unchecked box" : "checked box"}
						width="18"
						height="18"
					/>
					<p>I am an artist looking to buy beats and/or book studio sessions</p>
				</div>

				<div
					onClick={setEngineer}
					className={`${styles.type_box} ${
						type === "engineer"
							? styles.type_box_active
							: styles.type_box_inactive
					}`}
				>
					<Image
						src={
							type === "engineer" ? "/checked_box.svg" : "/unchecked_box.svg"
						}
						alt={type === "engineer" ? "unchecked box" : "checked box"}
						width="18"
						height="18"
					/>
					<p>I am a sound engineer looking to get mixing and mastering gigs</p>
				</div>
			</div>

			{handleType()}
		</div>
	);
}

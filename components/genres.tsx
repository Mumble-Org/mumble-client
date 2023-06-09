import { useEffect, useState } from "react";

import Image from "next/image";
import { set } from "../redux/actions/signup";
import styles from "./genres.module.css";
import { useDispatch } from "react-redux";

let genres_list = [];

export function Genre(props) {
	const [selected, setSelected] = useState(false);
	const dispatch = useDispatch();

	const handleClick = () => {
		let select = !selected;
		setSelected(select);

		if (select) {
			props.set(props.count + 1);
			genres_list.push(props.text.toLowerCase());
		} else {
			props.set(props.count - 1);
			genres_list.splice(genres_list.indexOf(props.text.toLowerCase()), 1);
		}

		dispatch(set("signup_genres", genres_list.join(", ")));
	};
	return (
		<div
			onClick={handleClick}
			className={`${styles.container} ${
				selected ? styles.container_active : styles.container_inactive
			}`}
		>
			<Image
				src={selected ? "/checked_box.svg" : "/unchecked_box.svg"}
				alt={selected ? "unchecked box" : "checked box"}
				width="18"
				height="18"
			/>
			<p>{props.text}</p>
		</div>
	);
}

let genres_profile_list = [];
/**
 * Genre component but only for the settings page
 * @param props
 * @returns
 */
export function GenreProfile(props) {
	const [selected, setSelected] = useState(false);

	useEffect(() => {
		// Set the genre has selected
		if (props.selected) {
			genres_profile_list.push(props.text.toLowerCase());
			setSelected(true);
		}
		props.setState(genres_profile_list.join(", "));
	}, []);

	const handleClick = () => {
		let select = !selected;
		setSelected(select);

		if (select) {
			genres_profile_list.push(props.text.toLowerCase());
		} else {
			genres_profile_list.splice(
				genres_profile_list.indexOf(props.text.toLowerCase()),
				1
			);
		}

		props.setState(genres_profile_list.join(", "));
	};
	return (
		<div
			onClick={handleClick}
			className={`${styles.container} ${
				selected ? styles.container_active : styles.container_inactive
			}`}
		>
			<Image
				src={selected ? "/checked_box.svg" : "/unchecked_box.svg"}
				alt={selected ? "unchecked box" : "checked box"}
				width="18"
				height="18"
			/>
			<p>{props.text}</p>
		</div>
	);
}

/**
 * Genre component but only one can be selected
 * @param props
 * @returns
 */
export function GenreSingle(props) {
	const [selected, setSelected] = useState(false);

	useEffect(() => {
		if (props.selected !== props.text) setSelected(false);
		else {
			setSelected(true);
		}
	}, [props.selected, props.text]);

	const handleClick = () => {
		props.setSelected(props.text);
	};
	return (
		<div
			onClick={handleClick}
			className={`${styles.container} ${
				selected ? styles.container_active : styles.container_inactive
			}`}
		>
			<Image
				src={selected ? "/checked_box.svg" : "/unchecked_box.svg"}
				alt={selected ? "unchecked box" : "checked box"}
				width="18"
				height="18"
			/>
			<p>{props.text}</p>
		</div>
	);
}

export const genres = [
	"Afrobeats",
	"HipHop",
	"Pop",
	"RnB",
	"Drill",
	"Funk",
	"Country",
	"Folk",
	"Alternative",
	"Rock",
	"Heavy Metal",
	"Jazz",
	"Electronic",
	"Reggae",
	"Disco",
	"Gospel",
	"House Music",
];

export function resetGenresList() {
	genres_list = [];
}

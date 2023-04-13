import styles from "../../styles/signup/details.module.css";
import { ActiveCarousel, InactiveCarousel } from "../../components/carousels/carousels";
import { ActiveNext, InactiveNext } from "../../components/buttons/next";
import { backend } from "../../utils/backend";

// redux
import { set } from "../../redux/actions/signup";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

export default function Name() {
	const dispatch = useDispatch();
	const [error, setError] = useState(false);
	const [valid, setValid] = useState(false);
	const [name, setName] = useState("");

	useEffect(() => {
		const id = setTimeout(async () => {
			try {
				const response = await backend.post(
					"/confirmUser",
					JSON.stringify({ name: name })
				);

				const exists = response.data.value;
				console.log(exists);
				if (exists) {
					setError(true);
					setValid(false);
				} else {
					setError(false);
          if (name.length >= 2) {
            setValid(true);
          }
				}
			} catch (e) {}
		}, 2000);

		return () => {
			clearTimeout(id);
		};
	}, [name]);

	const handleName = (e) => {
    setName(e.target.value);
    dispatch(set("signup_name", e.target.value));
		if (name.length < 2) {
			setValid(false);
		}
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.header}>Tell us about you</h1>

			<div className={styles.carousel}>
				<ActiveCarousel />
				<InactiveCarousel />
				<InactiveCarousel />
				<InactiveCarousel />
				<InactiveCarousel />
			</div>

			<h2 className={styles.subheader}>What is your name?</h2>
			<p className={styles.text}>
				This is the name that will be displayed on your profile so we advice
				that you enter your stage name.
			</p>

			<input
				onChange={handleName}
				className={`${styles.input} ${error ? styles.error_input : ""}`}
				type="text"
				placeholder="Enter your name"
			></input>
			{error ? (
				<p className={styles.error_text}>Name is already in use</p>
			) : (
				""
			)}

			{!valid ? <InactiveNext /> : <ActiveNext href="/signup/type" />}
		</div>
	);
}

import styles from "./subnav.module.css";
import { useState } from "react";

export function SubNav(props) {
	const [active, setActive] = useState("home");

	const handleClick = (e) => {
		const button = e.target.value;

		setActive(button);
	}

	return (
		<div className={styles.container}>
			<button
				type="button"
				value="home"
				className={`${styles.button} ${active === 'home' ? styles.button_active : ""}`}
				onClick={handleClick}
			>
				Home
			</button>

			<button
				type="button"
				value="trending"
				className={`${styles.button} ${active === "trending" ? styles.button_active : ""}`}
				onClick={handleClick}
			>
				Trending beats
			</button>

			<button
				type="button"
				value="discover"
				className={`${styles.button} ${active === "discover" ? styles.button_active : ""}`}
				onClick={handleClick}
			>
				Discover beats
			</button>

			<button
				type="button"
				value="producers"
				className={`${styles.button} ${active === "producers" ? styles.button_active : ""}`}
				onClick={handleClick}
			>
				Producers
			</button>

			<button
				type="button"
				value="engineers"
				className={`${styles.button} ${active === "engineers" ? styles.button_active : ""}`}
				onClick={handleClick}
			>
				Sound engineers
			</button>
		</div>
	);
}

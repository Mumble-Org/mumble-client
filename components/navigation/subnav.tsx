import styles from "./subnav.module.css";
import { useState } from "react";
import { set } from "../../redux/actions/home";
import { useSelector, useDispatch } from "react-redux";

export function SubNav(props) {
	const dispatch = useDispatch();
	const position = useSelector((state: any) => state.home.position);
	const [active, setActive] = useState(position);

	const handleClick = (e) => {
		const button = e.target.value;

		setActive(button);
		props.setPosition(button);
		dispatch(set('home_position', button));
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

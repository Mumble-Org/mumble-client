import styles from "./details.module.css";
import { genres, Genre } from "../genres";
import { InactiveContinue, ActiveContinue } from "../buttons/continue";
import { useState } from "react";
import { useRouter } from "next/router";

export function Producer() {
	const [genresCount, setGenresCount] = useState(0);
	const router = useRouter();

	return (
		<div className={styles.container}>
			<h2 className={styles.header}>What genre(s) of music do you produce?</h2>

			<div className={styles.genres}>
				{genres.map((genre) => (
					<Genre key={genre} text={genre} count={genresCount} set={setGenresCount} />
				))}
			</div>

			<div className={styles.continue}>
				{genresCount ? (
					<ActiveContinue onClick={() => router.push("/signup/portfolio")} />
				) : (
					<InactiveContinue />
				)}
			</div>
		</div>
	);
}

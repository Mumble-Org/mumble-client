import styles from "./continue.module.css";
import Image from "next/image";

export function InactiveContinue() {
	return (
		<div className={styles.container}>
			<button className={styles.button}>Continue</button>
			<Image
				src="/components/right-arrow.svg"
				alt="right arrow"
				width="11"
				height="19"
			/>
		</div>
	);
}

export function ActiveContinue(props) {
	return (
		<div className={styles.active_container} onClick={props.onClick}>
			<button className={styles.active_button}>Continue</button>
			<Image
				src="/components/right-arrow-active.svg"
				alt="right arrow"
				width="11"
				height="19"
			/>
		</div>
	);
}

export function InactiveFinish() {
	return (
		<div className={styles.container}>
			<button className={styles.button}>Finish</button>
			<Image
				src="/components/right-arrow-active.svg"
				alt="right arrow"
				width="11"
				height="19"
			/>
		</div>
	);
}

export function ActiveFinish(props) {
	return (
		<div
			className={styles.active_container}
			onClick={props.onClick}
		>
			<button className={styles.active_button}>Finish</button>
			<Image
				src="/components/right-arrow-active.svg"
				alt="right arrow"
				width="11"
				height="19"
			/>
		</div>
	);
}

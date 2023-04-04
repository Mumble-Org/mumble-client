import styles from "./continue.module.css";
import Link from "next/link";
import Image from "next/image";

export function InactiveContinue() {
	return (
		<Link href="" className={styles.container}>
			<button className={styles.button}>Continue</button>
			<Image
				src="/components/right-arrow.svg"
				alt="right arrow"
				width="11"
				height="19"
			/>
		</Link>
	);
}

export function ActiveContinue(props) {
	return (
		<Link href={props.href} className={styles.active_container}>
			<button className={styles.active_button}>Continue</button>
			<Image
				src="/components/right-arrow-active.svg"
				alt="right arrow"
				width="11"
				height="19"
			/>
		</Link>
	);
}

export function InactiveFinish() {
	return (
		<Link href="" className={styles.container}>
			<button className={styles.button}>Finish</button>
			<Image
				src="/components/right-arrow-active.svg"
				alt="right arrow"
				width="11"
				height="19"
			/>
		</Link>
	);
}

export function ActiveFinish(props) {
	return (
		<Link
			href={props.href}
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
		</Link>
	);
}

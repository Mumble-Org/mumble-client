import Image from "next/image";
import styles from './loading.module.css';

export function Loading() {

	return (
		<div className={styles.container}>
			<Image
				width='80'
				height='80'
				alt='mumble loggo'
				src='/Logo.svg'
			/>
			<p>Loading...</p>
		</div>
	);
}

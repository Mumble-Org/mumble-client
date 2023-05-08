import Image from "next/image";
import styles from './loading.module.scss';
import { Stack, Typography } from "@mui/material";

export function Loading() {

	return (
		<Stack direction="column" className={styles.container}>
			<Image
				width='80'
				height='80'
				alt='mumble loggo'
				src='/Logo.svg'
			/>
			<Typography>Loading...</Typography>
		</Stack>
	);
}

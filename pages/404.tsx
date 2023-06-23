import { Button, Grid, Typography } from "@mui/material";

import Image from "next/image";
import Link from "next/link";
import styles from "../styles/404.module.scss";

export default function NotFound() {
	return (
		<Grid container className={styles.container}>
			<Image
				src="/404.svg"
				width="440"
				height="320"
				alt="404: Page not found"
				className={styles.image}
			/>

			<Typography variant="h2" className={styles.text}>
				This page could not be found
			</Typography>

			<Link href="/">
				<Button variant="contained" className={styles.button}>
					Back To Home
				</Button>
			</Link>
		</Grid>
	);
}

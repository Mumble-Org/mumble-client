import Image from "next/image";
import styles from "./buttons.module.scss";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

export function BackToHome(props) {
	const router = useRouter();

	return (
		<Button
			startIcon={
				<Image
					src="/components/left-arrow.svg"
					alt="Left arrow"
					width="11"
					height="19"
				/>
			}
			onClick={() => router.push("/")}
			className={styles.button}
		>
			Back
		</Button>
	);
}

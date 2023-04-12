import Link from "next/link";
import styles from './back.module.css';

export function Back(props) {
  return (
    <Link href={props.href} className={styles.link}>
			<div className={styles.container}>
				<div className={styles.button}>
					<p>Back</p>
				</div>
			</div>
		</Link>
	);
}

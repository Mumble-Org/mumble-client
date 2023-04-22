import Image from "next/image"
import Link from "next/link";
import styles from './buttons.module.css';

export function BackToHome(props) {
  return (
    <Link className={styles.link} href="/">
      <Image
      src="/components/left-arrow.svg"
      alt="Left arrow"
      width="11"
      height="19"
    />
      <p className={styles.text}>{ props.text ? props.text : 'Back To Home'}</p>
    </Link>
  )
}

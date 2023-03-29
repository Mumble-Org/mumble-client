
import styles from './next.module.css';
import Link from 'next/link';
import Image from 'next/image';

export function InactiveNext() {
  return (
    <Link href="" className={styles.container}>
      <button className={styles.button}>
        Next
      </button>
      <Image
        src="/components/right-arrow.svg"
        alt="right arrow"
        width="11"
        height="19"
      />
    </Link>
  );
}

export function ActiveNext(props) {
  return (
    <Link href={props.href} className={styles.active_container}>
      <button className={styles.active_button}>
        Next
      </button>
      <Image
        src="/components/right-arrow-active.svg"
        alt="right arrow"
        width="11"
        height="19"
      />
    </Link>
  );
}

import styles from './carousels.module.css';

export function ActiveCarousel() {
  return (
    <hr className={styles.active}></hr>
  );
}

export function InactiveCarousel() {
  return (
    <hr className={styles.inactive}></hr>
  );
}

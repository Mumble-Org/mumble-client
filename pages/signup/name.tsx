import styles from '../../styles/signup/name.module.css';
import { ActiveCarousel, InactiveCarousel } from '../../components/carousels';
import { ActiveNext, InactiveNext } from '../../components/next';

// redux
import { set } from '../../redux/actions/signup';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

export default function Name() {
  const dispatch = useDispatch();
  const [valid, setValid] = useState(false);
  const [name, setName] = useState('');

  const handleName = (e) => {
    setName(e.target.value);
    if (name.length < 3) {
      setValid(false);
      dispatch(set("signup_name", e.target.value));
    }
    else {
      setValid(true);
      dispatch(set("signup_name", e.target.value));
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Tell us about you</h1>

      <div className={styles.carousel}>
        <ActiveCarousel />
        <InactiveCarousel />
        <InactiveCarousel />
        <InactiveCarousel />
        <InactiveCarousel/>
      </div>

      <h2 className={styles.subheader}>What is your name?</h2>
      <p className={styles.text}>This is the name that will be displayed on your profile so we advice that you enter your stage name.</p>

      <input
        onChange={handleName}
        className={styles.input}
        type="text"
        placeholder='Enter your name'
      ></input>

      {!valid ? <InactiveNext /> : <ActiveNext href="/signup/more"/>}
    </div>
  );
}

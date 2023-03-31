import styles from './genres.module.css';
import { useState } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { set } from '../redux/actions/signup';

let genres_list = [];

export function Genre(props) {
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    let select = !selected;
    setSelected(select);

    if (select) {
      props.set(props.count + 1);
      genres_list.push(props.text.toLowerCase());
    } else {
      props.set(props.count - 1);
      genres_list.splice(genres_list.indexOf(props.text.toLowerCase()), 1);
    }

    dispatch(set('signup_genres', genres_list.join(', ')))
  }
  return (
    <div
      onClick={handleClick}
      className={`${styles.container} ${selected ?
        styles.container_active : styles.container_inactive}`}>
      <Image
        src={selected ? '/checked_box.svg' : '/unchecked_box.svg'}
        alt={selected ? 'unchecked box' : 'checked box'}
        width='18'
        height='18'
      />
      <p>{props.text}</p>
    </div>
  );
}

export const genres = [
  'Afrobeats',
  'HipHop',
  'Pop',
  'RnB',
  'Funk',
  'Country',
  'Folk',
  'Alternative',
  'Rock',
  'Heavy Metal',
  'Jazz',
  'Electronic',
  'Reggae',
  'Disco',
  'Gospel',
  'House Music',
];

export function resetGenresList() {
  genres_list = [];
}

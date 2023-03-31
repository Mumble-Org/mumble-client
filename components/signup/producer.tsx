import styles from './details.module.css';
import { genres, Genre } from '../genres';
import { InactiveContinue, ActiveContinue } from '../continue';
import { useState } from 'react';

export function Producer() {
  const [genresCount, setGenresCount] = useState(0);

  return (
	  <div className={styles.container}>
		    <h2 className={styles.header}>What genre(s) of music do you produce?</h2>

        <div className={styles.genres}>
          {genres.map(genre => <Genre text={genre} count={genresCount} set={setGenresCount} />)}
        </div>

        {genresCount ? <ActiveContinue href=''/> : <InactiveContinue/>}
	  </div>
  )
}

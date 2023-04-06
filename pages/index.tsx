import Head from 'next/head';
import styles from '../styles/Home.module.css'
import { useState } from 'react';

import { NavBar } from '../components/navbar';

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Mumble</title>
        <link rel="" href="" />
      </Head>

      <NavBar loggedIn={loggedIn} />
    </div>
  )
}

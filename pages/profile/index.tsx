import { Profile } from "../../components/profile/profile";
import { NavBar } from "../../components/navigation/navbar";
import styles from "../../styles/Home.module.css";
import Head from "next/head";
import { useSelector } from "react-redux";

export default function ProfilePage() {
	const userState = useSelector((state: any) => state.user.user);
  return (
    <div className={styles.container}>
			<Head>
				<title>Mumble</title>
				<link rel="" href="" />
				<link rel="icon" type="img/x-icon" href="/Logo.svg" />
			</Head>

			<NavBar loggedIn={true} />
      <Profile user={userState} />
    </div>
  )
}
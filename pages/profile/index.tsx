import { Profile } from "../../components/profile/profile";
import { NavBar } from "../../components/navigation/navbar";
import styles from "../../styles/Home.module.css";
import { useSelector } from "react-redux";

export default function ProfilePage() {
	const userState = useSelector((state: any) => state.user.user);

  return (
    <div className={styles.container}>
			<NavBar loggedIn={true} />
      <Profile user={userState} />
    </div>
  )
}

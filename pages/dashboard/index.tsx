import { Dashboard } from "../../components/dashboard/dashboard";
import { NavBar } from "../../components/navigation/navbar";
import styles from "../../styles/Home.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function DashboardPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const userState = useSelector((state: any) => state.user);
  const token = userState.token;
  const router = useRouter();
  
  useEffect(() => {
		if (token != "" && token != undefined) {
			setLoggedIn(true);
    } else {
      router.push("/login");
    }
	}, []);

  return (
    <div className={styles.container}>
			<NavBar loggedIn={loggedIn} />
      {loggedIn ? <Dashboard user={userState.user} /> : ""}
    </div>
  )
}

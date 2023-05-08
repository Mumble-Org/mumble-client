import { Dashboard } from "../../components/dashboard/dashboard";
import { NavBar } from "../../components/navigation/navbar";
import styles from "../../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import { backend } from "../../utils/backend";
import { set as userSet } from "../../redux/actions/user";
import { Loading } from "../../components/loading";

export default function DashboardPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const userState = useSelector((state: any) => state.user);
  const [user, setUser] = useState<any>(undefined);
  const token = userState.token;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  /**
	 * Make sure user is logged in
	 */
  useEffect(() => {
		if (token != "" && token != undefined) {
			setLoggedIn(true);
    } else {
      router.push("/login");
    }
  }, []);

  /**
	 * Get profile picture and profile of user
	 */
  useEffect(() => {
    setLoading(true);
		backend
			.get("/users/profile", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
        response.data.user.imageUrl = response.data.imageUrl;
        setUser(response.data.user);
        dispatch(userSet("user", response.data.user));
        setLoading(false);
			})
			.catch((e) => {
				if (e.response.status === 401) router.push("/login");
			});
	}, []);

  return (
    <Grid container className={styles.container}>
			<NavBar loggedIn={loggedIn} />
      {!loading ? <Dashboard user={user} /> : <Loading />}
    </Grid>
  )
}

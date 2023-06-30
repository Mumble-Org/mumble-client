import { getItem, setItem } from "../../utils/cache";
import { useEffect, useState } from "react";

import { Beat } from "../beat";
import { Stack } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";
import { backend } from "../../utils/backend";
import { useSelector } from "react-redux";

export default function SavedBeats(props) {
	const [beats, setBeats] = useState([]);
	const [loading, setLoading] = useState(false);
	const token = useSelector((state: any) => state.user.token);

	useEffect(() => {
		setLoading(true);
		let beats = getItem("DashboardSavedBeats");

		if (!beats || beats === undefined || true) {
			backend
				.get("/beats/saved", {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((response) => {
					setBeats(response.data);
					// Cache for 5 minutes
					setItem("DashboardSavedBeats", response.data);
				})
				.catch((err) => {
					setBeats([]);
					console.log(err);
				});
		} else {
			setBeats(beats);
		}

		setLoading(false);
	}, []);

	return (
		<Stack>
			{beats.map((beat) => {
				return <Beat beat={beat} key={beat._id} saved />;
			})}

			{loading ? (
				<ThreeDots
					height="64"
					width="64"
					color="#febfff"
					wrapperClass="loader"
				/>
			) : null}
		</Stack>
	);
}

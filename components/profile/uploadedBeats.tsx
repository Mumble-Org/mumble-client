import React, { useEffect, useState } from "react";
import { getItem, setItem } from "../../utils/cache";

import { Beat } from "../beat";
import { Stack } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";
import { backend } from "../../utils/backend";
import styles from "./uploadedBeats.module.scss";

export function UploadedBeats(props) {
	const [beats, setBeat] = useState([]);
	const [loading, setLoading] = useState(false);
	const { id } = props;

	useEffect(() => {
		async function fetchUserBeats() {
			setLoading(true);
			let beats = getItem("DashboardUploadedBeats");

			if (!beats || beats === undefined) {
				try {
					const response = await backend(`/beats/getuserbeats/?id=${id}`);

					setBeat(response.data);
					// Cache for 5 minutes
					setItem("DashboardUploadedBeats", response.data);
				} catch (err) {
					setBeat([]);
					console.log(err);
				}
			} else {
				setBeat(beats);
			}

			setLoading(false);
		}
		fetchUserBeats();
	}, []);

	return (
		<Stack className={styles.container}>
			{beats &&
				beats.map((beat) => {
					return <Beat beat={beat} key={beat._id} />;
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

export default UploadedBeats;

import { useEffect, useState } from "react";

import { Beat } from "../beat";
import { Stack } from "@mui/material";
import { backend } from "../../utils/backend";
import { useSelector } from "react-redux";

export default function SavedBeats(props) {
	const [beats, setBeats] = useState([]);
	const token = useSelector((state: any) => state.user.token);

	useEffect(() => {
		backend
			.get("/beats/saved", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				setBeats(response.data);
			});
	}, []);

	return (
		<Stack>
			{beats.map((beat) => {
				return <Beat beat={beat} key={beat._id} saved />;
			})}
		</Stack>
	);
}

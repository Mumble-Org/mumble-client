import { Grid } from "@mui/material";
import { useRouter } from "next/router";

export default function NotFound() {
	const router = useRouter();
	const { username } = router.query;

	return <Grid>404: {username} not found</Grid>;
}

import {
	Alert,
	Box,
	Button,
	FormLabel,
	Grid,
	InputAdornment,
	MenuItem,
	Stack,
	TextField,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useEffect, useMemo, useState } from "react";
import styles from "./details.module.scss";
import { getCitySuggestions } from "../../utils/getCities";
import { genres, GenreProfile } from "../genres";
import { backend } from "../../utils/backend";
import { useDispatch } from "react-redux";
import { set as userSet } from "../../redux/actions/user";
import { useRouter } from "next/router";
import { ThreeDots } from "react-loader-spinner";

export function Artist(props) {
	const dispatch = useDispatch();
	const router = useRouter();
	const [name, setName] = useState(props.user.name);
	const [email, setEmail] = useState(props.user.email);
	const [location, setLocation] = useState(props.user.location || "");
	const [locations, setLocations] = useState([]);
	const [open, setOpen] = useState(true);
	const [genresList, setGenres] = useState("");
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	/**
	 * Memoized function to get city suggestions
	 */
	const getCities = useMemo(() => getCitySuggestions(location), [location]);

	/**
	 * Get list of cities for location dropdown
	 */
	useEffect(() => {
		const timeOut = setTimeout(() => {
			if (location && open) {
				setOpen(true);
				getCities.then((locations) => setLocations(locations));
			} else {
				setOpen(false);
				setLocations([]);
			}
		}, 2000);

		return () => {
			clearTimeout(timeOut);
		};
	}, [location, open, getCities]);

	const handleLocation = (e) => {
		let text = e.target.value;
		if (text) {
			setOpen(true);
		} else {
			setOpen(false);
		}
		setLocation(text);
	};

	const handleSelectLocation = (e) => {
		let text = e.target.getAttribute("value");
		setLocation(text);
		setOpen(false);
	};

	const updateUser = () => {
		setLoading(true);
		backend
			.put(
				"/users/update",
				{
					name,
					genres: genresList.split(", "),
					location,
				},
				{
					headers: {
						Authorization: `Bearer ${props.token}`,
					},
				}
			)
			.then((response) => {
				setSuccess(true);
				props.setUser(response.data);
			})
			.catch((e) => {
				setError(true);
				if (e.response.status === 401) router.push("/login");
			});

		// Fetch User Profile
		backend
			.get("/users/profile", {
				headers: {
					Authorization: `Bearer ${props.token}`,
				},
			})
			.then((response) => {
				response.data.user.imageUrl = response.data.imageUrl;
				dispatch(userSet("user", response.data.user));
			})
			.catch((e) => {
				if (e.response.status === 401) router.push("/login");
			});
		setLoading(false);
	};

	return (
		<Grid container className={styles.container}>
			<Stack direction="row" sx={{ gap: "16px" }}>
				<Box className={styles.scene_container}>
					<Button disabled className={styles.scene}>Account information</Button>
				</Box>
			</Stack>

			{/* Account Information */}
			<Stack className={styles.form}>
				{/* Stage Name */}
				<Stack className={styles.input_container}>
					<FormLabel className={styles.label}>Stage name</FormLabel>
					<TextField
						variant="filled"
						className={styles.input}
						inputProps={{ className: styles.input_elem }}
						defaultValue={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
					></TextField>
				</Stack>

				{/* Email */}
				<Stack className={styles.input_container}>
					<FormLabel className={styles.label}>Email</FormLabel>
					<TextField
						variant="filled"
						disabled
						className={styles.input}
						inputProps={{ className: styles.input_elem }}
						defaultValue={email}
					></TextField>
				</Stack>

				{/* Location */}
				<Stack style={{ gap: "8px" }}>
					<Stack className={styles.input_container}>
						<FormLabel className={styles.label}>Location</FormLabel>
						<TextField
							variant="filled"
							className={styles.input}
							inputProps={{
								className: styles.input_elem,
							}}
							InputProps={{
								startAdornment: (
									<InputAdornment
										position="start"
										style={{
											margin: "0",
											paddingRight: "12px",
											cursor: "default",
											background: "#666666",
										}}
									>
										<LocationOnIcon
											style={{ color: "#ffffff" }}
											className={styles.icon}
										/>
									</InputAdornment>
								),
							}}
							value={location}
							onChange={handleLocation}
						></TextField>
					</Stack>

					{/* Location select */}
					{open ? (
						<Stack className={styles.locations}>
							{locations?.map((loc) => {
								return (
									<MenuItem
										className={styles.location_select}
										value={loc}
										key={loc}
										onClick={handleSelectLocation}
									>
										<LocationOnIcon
											style={{ color: "#000000" }}
											className={styles.icon}
										/>
										{loc}
									</MenuItem>
								);
							})}
						</Stack>
					) : (
						""
					)}
				</Stack>

				{/* Genres */}
				<Stack className={styles.input_container}>
					<FormLabel className={styles.label}>Genre(s)</FormLabel>
					<Grid container className={styles.input_container}>
						{genres?.map((genre) => (
							<GenreProfile
								key={genre}
								text={genre}
								selected={props.user.genres?.includes(genre.toLowerCase())}
								setState={setGenres}
							/>
						))}
					</Grid>
				</Stack>
			</Stack>

			<Button
				variant="contained"
				component="label"
				className={styles.contained_button}
				sx={{ alignSelf: "flex-end" }}
				onClick={updateUser}
			>
				Save Changes
			</Button>

			{success && (
				<Alert
					severity="success"
					onClose={() => {
						setSuccess(false);
					}}
					className={styles.alert}
				>
					Profile Updated Successfully
				</Alert>
			)}

			{error && (
				<Alert
					severity="error"
					onClose={() => {
						setError(false);
					}}
					className={styles.alert}
				>
					Error Updating Profile, please try again!
				</Alert>
			)}

			{loading && (
				<ThreeDots
					color="#febfff"
					wrapperStyle={{
						alignSelf: "center",
					}}
				/>
			)}
		</Grid>
	);
}

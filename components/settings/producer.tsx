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
import { Portfolio } from "./portfolio";
import { backend } from "../../utils/backend";
import { useDispatch } from "react-redux";
import { set as userSet } from "../../redux/actions/user";
import { useRouter } from "next/router";
import { ThreeDots } from "react-loader-spinner";
import Image from "next/image";

export function Producer(props) {
	const dispatch = useDispatch();
	const router = useRouter();
	const [scene, setScene] = useState("account information");
	const [name, setName] = useState(props.user.name);
	const [email, setEmail] = useState(props.user.email);
	const [location, setLocation] = useState(props.user.location || "");
	const [locations, setLocations] = useState([]);
	const [open, setOpen] = useState(true);
	const [calendar, setCalendar] = useState(props.user.calendar);
	const [phoneNumber, setPhoneNumber] = useState(props.user.phone_number);
	const [genresList, setGenres] = useState("");
	const [portfolio, setPortfolio] = useState([...props.user.portfolio]);
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

	/**
	 * Set Portfolio in state
	 */
	useEffect(() => {
		setPortfolio(props.user.portfolio);
	}, []);

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

	const handleChangePortfolio = (e, index) => {
		// Copy portfolio to new array
		const {name, value } = e.target;
		let newPortfolio = [...portfolio];
		
		// Change the link at it's index to new value
		newPortfolio[index] = {
			...newPortfolio[index],
			[name]: value
		};

		// Update the portfolio state
		setPortfolio(newPortfolio);
	};

	const handleDeletePortfolio = (index) => {
		// Copy portfolio to new array except the deleted link
		let newPortfolio = [...portfolio];
  	newPortfolio.splice(index, 1);

		// Update portfolio state
		setPortfolio(newPortfolio);
	};

	const handleAddLink = (e) => {
		// Copy portfolio to new array
		let newPortfolio = [].concat(portfolio);
		// Add new empty string
		newPortfolio.push("");
		// Update portfolio
		setPortfolio(newPortfolio);
	};

	const updateUser = () => {
		setLoading(true);
		backend
			.put(
				"/users/update",
				{
					name,
					calendar,
					genres: genresList.split(", "),
					location,
					phone_number: phoneNumber,
					portfolio,
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
					<Button
						className={`${styles.scene_active} ${
							scene !== "account information" ? styles.scene_inactive : ""
						}`}
						onClick={() => {
							setScene("account information");
						}}
					>
						Account information
					</Button>
					{scene === "account information" ? (
						<hr className={styles.underline} />
					) : (
						""
					)}
				</Box>

				<Box className={styles.scene_container}>
					<Button
						className={`${styles.scene_active} ${
							scene !== "past work" ? styles.scene_inactive : ""
						}`}
						onClick={() => {
							setScene("past work");
						}}
					>
						Past work
					</Button>
					{scene === "past work" ? <hr className={styles.underline} /> : ""}
				</Box>
			</Stack>

			{scene === "account information" ? (
				<>
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

						{/* Calendar link */}
						<Stack className={styles.input_container}>
							<FormLabel className={styles.label}>Calendar link</FormLabel>
							<TextField
								variant="filled"
								className={styles.input}
								inputProps={{ className: styles.input_elem }}
								defaultValue={calendar}
								onChange={(e) => {
									setCalendar(e.target.value);
								}}
							></TextField>
						</Stack>

						{/* Phone number */}
						<Stack className={styles.input_container}>
							<FormLabel className={styles.label}>Phone number</FormLabel>
							<TextField
								variant="filled"
								className={styles.input}
								inputProps={{ className: styles.input_elem }}
								defaultValue={phoneNumber}
								onChange={(e) => {
									setPhoneNumber(e.target.value);
								}}
							></TextField>
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
				</>
			) : (
				<>
					{/* Past Work */}
					<Stack className={styles.form}>
						{/* Add new link button */}
						<Button
							className={styles.add_link}
							startIcon={
								<Image
									width="14"
									height="14"
									alt="add new link"
									src="/add.svg"
								/>
							}
							onClick={handleAddLink}
						>
							Add New Link
						</Button>

						{portfolio?.map((song) => {
							return (
								<div key={portfolio.indexOf(song)}>
									<Portfolio
										index={portfolio.indexOf(song)}
										song={song}
										onChange={handleChangePortfolio}
										onDelete={handleDeletePortfolio}
									/>
								</div>
							);
						})}
					</Stack>
				</>
			)}

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

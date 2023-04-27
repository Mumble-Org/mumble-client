import styles from "../styles/upload.module.css";
import genreStyles from "../components/signup/details.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { genres, GenreSingle } from "../components/genres";
import { backend } from "../utils/backend";

// redux
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Back } from "../components/buttons/back";
import { ActiveFinish } from "../components/buttons/continue";
import { ThreeDots } from "react-loader-spinner";

export default function Upload() {
	const [loggedIn, setLoggedIn] = useState(false);
	const userState = useSelector((state: any) => state.user);
	const token = userState.token;
	const dispatch = useDispatch();
	const router = useRouter();
	const [genrename, setGenre] = useState("Afrobeats");
	const [price, setPrice] = useState(Number("30000").toLocaleString());
	const [license, setLicense] = useState("");
	const [name, setName] = useState("");
	const [beat, setBeat] = useState<any>("");
	const [data, setData] = useState<any>("");
	const [art, setArt] = useState<any>("/logo.svg");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (token != "" && token != undefined) {
			setLoggedIn(true);
		} else {
			router.push("/login");
		}
	}, []);

	useEffect(() => {
		// sleep for 3 seconds
		sleep();
		setSuccess(false);
	}, [success]);

	useEffect(() => {
		// sleep for 3 seconds
		sleep();
		setError(false);
	}, [error]);

	// file types
	const audioTypes = [
		"application/mp3",
		"application/flac",
		"application/wav",
		"audio/mpeg",
	];

	const dataTypes = ["application/vnd.rar", "application/zip", ""];

	const handleBeatname = (e) => {
		const input = e.target.value;
		setName(input);
	};

	const sleep = () => {
		let end = new Date().getTime() + 3000;
		while (new Date().getTime() < end) {}

		return;
	};

	const handlePrice = (e) => {
		// remove commas
		let input = e.target.value.replace(/,/gi, "");
		const formattedInput = Number(input).toLocaleString();
		setPrice(formattedInput);
	};

	const handleLicense = (e) => {
		const input = e.target.value;
		setLicense(input);
	};

	const beatHandler = (e) => {
		e.preventDefault();
		const beat = e.target.files[0];
		setBeat(beat);
	};

	const dataHandler = (e) => {
		e.preventDefault();
		const data = e.target.files[0];
		setData(data);
	};

	const deleteBeat = () => {
		setBeat("");
		setData("");
		setArt("/logo.svg");
	};

	const removeBeat = () => {
		setBeat({});
	};

	const removeData = () => {
		setData({});
	};

	const beatDropHandler = (e) => {
		e.preventDefault();
		let file;
		let beat;

		if (e.dataTransfer.items) {
			file = e.dataTransfer.items[0];

			if (audioTypes.includes(file.type)) {
				beat = file.getAsFile();
			}
		} else {
			file = e.dataTransfer.files[0];

			if (audioTypes.includes(file.type)) {
				beat = file;
			}
		}

		setBeat(beat);
	};

	const dataDropHandler = (e) => {
		e.preventDefault();
		let file;
		let data;

		if (e.dataTransfer.items) {
			file = e.dataTransfer.items[0];

			if (dataTypes.includes(file.type)) {
				data = file.getAsFile();
			}
		} else {
			file = e.dataTransfer.files[0];

			if (dataTypes.includes(file.type)) {
				data = file;
			}
		}

		setData(data);
	};

	const dragOverHandler = (e) => {
		e.preventDefault();
	};

	const handleArt = (e) => {
		e.preventDefault();
		const image = e.target.files[0];
		try {
			setArt(image);
		} catch (e) {}
	};

	const uploadBeat = async () => {
		setLoading(true);
		console.log(1);

		if (beat && data && name && license && price) {
			try {
				const formData = new FormData();
				formData.append("audio", beat);
				formData.append("image", art);
				formData.append("data", data);
				formData.append("title", name);
				formData.append("genre", genrename.toLowerCase());
				formData.append("license", license);
				formData.append("price", price);

				const response = await backend.post("/beats", formData, {
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "multipart/form-data",
					},
				});

				if (response.status === 201) {
					// show success message
					setSuccess(true);
					router.push("/dashboard");
				} else {
					setError(true);
				}
			} catch (e) {
				setError(true);
			}
		}

		setLoading(false);
	};

	return (
		<div className={styles.container}>
			{success ? (
				<div className={styles.success}>Beat uploaded successfully</div>
			) : (
				""
			)}

			{error ? (
				<div className={styles.error}>Problem uploading beat! Please try again</div>
			) : (
				""
			)}

			<h1 className={styles.header}>Upload a beat</h1>

			<h2 className={styles.subheader}>Upload a beat and start selling!</h2>

			{beat && data ? (
				<div className={styles.uploaded_beat}>
					<div className={styles.uploaded_beat_main}>
						<Image
							src={typeof art === "string" ? art : URL.createObjectURL(art)}
							alt="artwork"
							width="80"
							height="80"
							className={styles.uploaded_beat_image}
						/>

						<div className={styles.uploaded_beat_submain}>
							{/* @ts-ignore */}
							<p>{beat.name}</p>
							<label className={styles.add_artwork} onChange={handleArt}>
								<input
									name="art"
									type="file"
									accept="image/*"
									onChange={handleArt}
								></input>
								<Image src="/add.svg" alt="add link" width="14" height="14" />
								<p>Add Artwork</p>
							</label>
						</div>
					</div>

					<div className={styles.uploaded_beat_bin} onClick={deleteBeat}>
						<Image src="/bin.svg" alt="delete beat" width="21" height="24" />
					</div>
				</div>
			) : (
				<div className={styles.uploads_container}>
					<label
						className={styles.upload_beat}
						onDrop={beatDropHandler}
						onDragOver={dragOverHandler}
					>
						<input
							name="beat"
							type="file"
							onChange={beatHandler}
							accept={audioTypes.join(",")}
						></input>

						<Image
							src="/upload_audio.svg"
							alt="upload beat"
							width="40"
							height="40"
						/>
						{beat ? (
							<Image
								src="/exit.svg"
								alt="remove beat"
								width="16"
								height="16"
								className={styles.exit_button}
								onClick={removeBeat}
							/>
						) : (
							""
						)}

						{beat ? (
							<div className={styles.upload_beat_details}>
								<div className={styles.upload_beat_text_div}>
									<p>{beat.name}</p>
								</div>
								<p className={styles.upload_beat_color2}>Upload Another File</p>
							</div>
						) : (
							<div className={styles.upload_beat_details}>
								<div className={styles.upload_beat_text_div}>
									<p>Drag and drop or </p>
									<p className={styles.upload_beat_color}>Choose File </p>
									<p>to upload audio file</p>
								</div>
								<p>File types allowed: mp3, FLAC & wav</p>
							</div>
						)}
					</label>

					<label
						className={styles.upload_beat}
						onDrop={dataDropHandler}
						onDragOver={dragOverHandler}
					>
						<input
							name="beat"
							type="file"
							onChange={dataHandler}
							accept={dataTypes.join(",")}
						></input>

						<Image
							src="/upload_file.svg"
							alt="upload beat"
							width="40"
							height="40"
						/>
						{data ? (
							<Image
								src="/exit.svg"
								alt="remove beat"
								width="16"
								height="16"
								className={styles.exit_button}
								onClick={removeData}
							/>
						) : (
							""
						)}

						{data ? (
							<div className={styles.upload_beat_details}>
								<div className={styles.upload_beat_text_div}>
									<p>{data.name}</p>
								</div>
								<p className={styles.upload_beat_color2}>Upload Another file</p>
							</div>
						) : (
							<div className={styles.upload_beat_details}>
								<div className={styles.upload_beat_text_div}>
									<p>Drag and drop or </p>
									<p className={styles.upload_beat_color}>Choose File </p>
									<p>to upload the stems of your beat</p>
								</div>
								<p>File types allowed: rar & zip</p>
							</div>
						)}
					</label>
				</div>
			)}

			<div className={genreStyles.genres}>
				{genres.map((genre) => (
					<GenreSingle
						key={genre}
						text={genre}
						selected={genrename}
						setSelected={setGenre}
					/>
				))}
			</div>

			<div className={styles.infos_container}>
				{/* beat name */}
				<div className={styles.info_container}>
					<label htmlFor="input" className={styles.info_label}>
						Add a name for your beat
					</label>
					<div className={styles.info_input_div}>
						<input
							className={styles.info_input}
							name="input"
							placeholder="Enter beat name"
							onChange={handleBeatname}
						></input>
					</div>
				</div>

				{/* price */}
				<div className={styles.info_container}>
					<label htmlFor="input" className={styles.info_label}>
						Choose a price for your beat
					</label>
					<div className={styles.info_input_div}>
						<p>NGN</p>
						<input
							onChange={handlePrice}
							className={styles.info_input}
							name="input"
							placeholder="30,000"
							value={price}
						></input>
					</div>
				</div>

				{/* beat license */}
				<div className={styles.info_container}>
					<label htmlFor="input" className={styles.info_label}>
						What license?
					</label>
					<div className={styles.info_input_div}>
						<select className={styles.info_select} onChange={handleLicense}>
							<option value="">Select an option</option>
							<option value="basic">Basic License</option>
							<option value="non-exclusive">Non-Exclusive License</option>
							<option value="exclusive">Exclusive License</option>
						</select>
					</div>
				</div>
			</div>

			{loading ? (
				<ThreeDots color="#febfff" wrapperStyle={{ alignSelf: "center" }} />
			) : (
				""
			)}

			<div className={styles.next_page}>
				<Back href="/dashboard" />
				<ActiveFinish onClick={uploadBeat} />
			</div>
		</div>
	);
}

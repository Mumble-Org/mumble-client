import styles from "../../styles/signup/details.module.css";
import genreStyles from "../../components/signup/details.module.css";
import { ActiveCarousel, InactiveCarousel } from "../../components/carousels";
import Image from "next/image";
import { useRouter } from "next/router";
import { genres, GenreSingle } from "../../components/genres";

// redux
import { set } from "../../redux/actions/signup";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { Back } from "../../components/back";
import { ActiveFinish } from "../../components/continue";

export default function Upload() {
	const dispatch = useDispatch();
	const router = useRouter();
	const [genrename, setGenre] = useState("Afrobeats");
	const [price, setPrice] = useState(Number("30000").toLocaleString());
	const [license, setLicense] = useState("");
	const [name, setName] = useState("");
	const [beat, setBeat] = useState('');
	const [art, setArt] = useState("/logo.svg");

	// file types
	const types = [
		"application/mp3",
		"application/flac",
		"application/wav",
		"audio/mpeg",
	];

	const handleBeatname = (e) => {
		const input = e.target.value;
		setName(input);
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
  
  const deleteBeat = () => {
    setBeat('');
  }

	const dropHandler = (e) => {
    e.preventDefault();
    let file;
    let beat;

    if (e.dataTransfer.items) {
      file = e.dataTransfer.items[0];

      if (types.includes(file.type)) {
        beat = file.getAsFile();
      }
    } else {
      file = e.dataTransfer.files[0]

      if (types.includes(file.type)) {
        beat = file;
      }
    }

    setBeat(beat);
	};

	const dragOverHandler = (e) => {
		e.preventDefault();
	};

  const handleArt = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    try {
      setArt(URL.createObjectURL(image));
    } catch (e) { };
  };
  
  const uploadBeat = () => {
		router.push("/");
  }

	return (
		<div className={styles.container}>
			<h1 className={styles.header}>Upload your first beat</h1>

			<div className={styles.carousel}>
				<InactiveCarousel />
				<InactiveCarousel />
				<InactiveCarousel />
				<InactiveCarousel />
				<ActiveCarousel />
			</div>

			<h2 className={styles.portfolio_subheader}>
				Upload your first beat and start selling!
			</h2>

			{beat ? (
				<div className={styles.uploaded_beat}>
					<div className={styles.uploaded_beat_main}>
						<Image
							src={art}
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
				<label
					className={styles.upload_beat}
					onDrop={dropHandler}
					onDragOver={dragOverHandler}
				>
					<input
						name="beat"
						type="file"
						onChange={beatHandler}
						accept={types.join(",")}
					></input>
					<Image src="/upload.svg" alt="upload beat" width="37" height="36" />
					<div className={styles.upload_beat_text_div}>
						<p>Drag and drop or </p>
						<p className={styles.upload_beat_color}>Choose File </p>
						<p>to upload</p>
					</div>
					<p>File types allowed: mp3, FLAC & wav</p>
				</label>
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

			<div className={styles.next_page}>
				<Back href="/signup/booking" />
				<ActiveFinish onClick={uploadBeat} />
			</div>
		</div>
	);
}

import styles from "../../styles/signup/details.module.css";
import {
	ActiveCarousel,
	InactiveCarousel,
} from "../../components/carousels/carousels";

import Image from "next/image";

// redux
import { set } from "../../redux/actions/signup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Back } from "../../components/buttons/back";
import { ActiveContinue } from "../../components/buttons/continue";

function SongLinkDelete(props) {

	const handleChange = (e) => {
		const { name, value } = e.target;
    let newPortfolio = [...props.portfolio];
		
		// Change the link at it's index to new value
		newPortfolio[props.id] = {
			...newPortfolio[props.id],
			[name]: value
		};
    props.setPortfolio(newPortfolio);
	};

	const handleDelete = (index) => {
		// Copy portfolio to new array except the deleted link
		let newPortfolio = [...props.portfolio];
  	newPortfolio.splice(index, 1);

		// Update portfolio state
		props.setPortfolio(newPortfolio);
	};

	return (
		<div className={styles.link_container} id={props.id}>
			<div>
				<label htmlFor="title" className={styles.link_label}>
					Song Title
				</label>
				<div className={styles.link_input_div}>
					<input
						onChange={handleChange}
						className={styles.link_input}
						name="title"
						value={props.song.title}
						placeholder="Add Song title"
					></input>
				</div>
			</div>

			<div>
				<label htmlFor="value" className={styles.link_label}>
					Song link
				</label>

				<div className={styles.link_input_div}>
					<input
						onChange={handleChange}
						className={styles.link_input}
						name="link"
						value={props.song.link}
						placeholder="Add a link"
					></input>

					<div className={styles.link_button} onClick={() => handleDelete(props.id)}>
						<Image src="/bin.svg" alt="delete link" width="16" height="18" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default function Portfolio() {
	const song = useSelector((state: any) => state.signup.user.song);
	const router = useRouter();
	const dispatch = useDispatch();
	const [portfolio, setPortfolio] = useState([{}]);

	const addLink = () => {
		// Copy portfolio to new array
		let newPortfolio = [].concat(portfolio);
		// Add new empty string
		newPortfolio.push("");
		setPortfolio([...newPortfolio]);
	};

	useEffect(() => {
		dispatch(set("signup_portfolio", JSON.stringify(portfolio)));
	}, [portfolio, dispatch]);

	return (
		<div className={styles.container}>
			<h1 className={styles.header}>Connect your past work</h1>

			<div className={styles.carousel}>
				<InactiveCarousel />
				<InactiveCarousel />
				<ActiveCarousel />
				<InactiveCarousel />
				{song === "producer" ? <InactiveCarousel /> : ""}
			</div>

			{song === "producer" ? (
				<h2 className={styles.portfolio_subheader}>
					If you have any songs you produced on digital platforms we advice that
					you connect the songs to be displayed on your account by adding the
					apple music links for each song in the fields below.{" "}
				</h2>
			) : (
				<h2 className={styles.portfolio_subheader}>
					If you have any songs you mixed released on digital platforms we
					advice that you connect the songs to be displayed on your account by
					adding the apple music links for each song in the fields below.
				</h2>
			)}

			<div className={styles.links_container}>
				{portfolio?.map((song, key) => {
					return (
						<SongLinkDelete
							id={key}
							key={key}
							song={song}
							portfolio={portfolio}
							setPortfolio={setPortfolio}
						/>
					);
				})}
			</div>

			<div className={styles.add_link} onClick={addLink}>
				<Image src="/add.svg" alt="add link" width="14" height="14" />
				<p>Add Another Link</p>
			</div>

			<div className={styles.next_page}>
				<Back href="/signup/song" />
				<ActiveContinue onClick={() => router.push("/signup/booking")} />
			</div>
		</div>
	);
}

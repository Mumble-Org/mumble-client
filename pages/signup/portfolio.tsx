import styles from "../../styles/signup/details.module.css";
import { ActiveCarousel, InactiveCarousel } from "../../components/carousels";
import Image from "next/image";

// redux
import { set } from "../../redux/actions/signup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Back } from "../../components/back";
import { ActiveContinue } from "../../components/continue";

function SongLink(props) {
	const handleChange = (e) => {
		const link = e.target.value;
		const temp = { ...props.portfolio };
		temp[props.id] = link;
		props.setPortfolio(temp);
	};

	return (
		<div className={styles.link_container}>
			<label htmlFor="input" className={styles.link_label}>
				Song link
			</label>
			<div className={styles.link_input_div}>
				<input
					onChange={handleChange}
					className={styles.link_input}
					name="input"
					placeholder="Add a link"
				></input>
			</div>
		</div>
	);
}

function SongLinkDelete(props) {
	const handleChange = (e) => {
		const link = e.target.value;
		const temp = { ...props.portfolio };
		temp[props.id] = link;
		props.setPortfolio(temp);
	};

	const handleDelete = (e) => {
		e.preventDefault();

		const temp = props.links;
		props.setLinks(temp.filter((link) => link !== props.id));

		let portfolio = props.portfolio;
		delete portfolio[props.id];
		props.setPortfolio(portfolio);
	};

	return (
		<div className={styles.link_container} id={props.id}>
			<label htmlFor="input" className={styles.link_label}>
				Song link
			</label>

			<div className={styles.link_input_div}>
				<input
					onChange={handleChange}
					className={styles.link_input}
					name="input"
					placeholder="Add a link"
				></input>

				<div className={styles.link_button} onClick={handleDelete}>
					<Image src="/bin.svg" alt="delete link" width="16" height="18" />
				</div>
			</div>
		</div>
	);
}

export default function Portfolio() {
	const type = useSelector((state: any) => state.signup.user.type);
	const dispatch = useDispatch();
	const [links, setLinks] = useState(["link1", "link2", "link3"]);
	const [portfolio, setPortfolio] = useState({});

	const addLink = () => {
		const id = Date.now().toString();
		setLinks([...links, id]);
	};

	useEffect(() => {
		dispatch(set("signup_portfolio", Object.values(portfolio).join(", ")));
	}, [portfolio]);

	return (
		<div className={styles.container}>
			<h1 className={styles.header}>Connect your past work</h1>

			<div className={styles.carousel}>
				<InactiveCarousel />
				<InactiveCarousel />
				<ActiveCarousel />
				<InactiveCarousel />
				{type === "producer" ? <InactiveCarousel /> : ""}
			</div>

			{type === "producer" ? (
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
				{links.map((type) => {
					if (type.startsWith("link")) {
						return (
							<SongLink
								key={type}
								id={type}
								portfolio={portfolio}
								setPortfolio={setPortfolio}
							/>
						);
					} else {
						return (
							<SongLinkDelete
								id={type}
								key={type}
								links={links}
								setLinks={setLinks}
								portfolio={portfolio}
								setPortfolio={setPortfolio}
							/>
						);
					}
				})}
			</div>

			<div className={styles.add_link} onClick={addLink}>
				<Image src="/add.svg" alt="add link" width="14" height="14" />
				<p>Add Another Link</p>
			</div>

			<div className={styles.next_page}>
				<Back href="/signup/type" />
				<ActiveContinue href="/signup/booking" />
			</div>
		</div>
	);
}

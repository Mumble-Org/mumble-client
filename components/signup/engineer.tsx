import styles from "./details.module.css";
import { useState } from "react";
import { set } from "../../redux/actions/signup";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { InactiveContinue, ActiveContinue } from "../continue";

export function Engineer() {
	const dispatch = useDispatch();
	const router = useRouter();
	const [price, setPrice] = useState(Number("30000").toLocaleString());

	const handlePrice = (e) => {
		// remove commas
		let input = e.target.value.replace(/,/gi, "");
		const formattedInput = Number(input).toLocaleString();
		setPrice(formattedInput);
		dispatch(set("signup_rate", formattedInput));
	};

	return (
		<div className={styles.engineer_container}>
      <h3 className={styles.engineer_subheader}>What is your standard rate per song?</h3>

			<label htmlFor="input" className={styles.engineer_label}>
				Enter your standard rate per song
      </label>

			<div className={styles.engineer_input_div}>
				<p>NGN</p>
				<input
					onChange={handlePrice}
					className={styles.engineer_input}
					name="input"
					placeholder="30,000"
					value={price}
				></input>
      </div>
      
      <div className={styles.continue}>
				{price !== '0' ? (
					<ActiveContinue onClick={() => router.push("/signup/portfolio")} />
				) : (
					<InactiveContinue />
				)}
			</div>
		</div>
	);
}

import Image from "next/image";
import Link from "next/link";
import styles from "../styles/signup/signup.module.css";
import { BackToHome } from "../components/buttons/buttons";
import { useState, useEffect } from "react";
import { backend } from "../utils/backend";

// redux
import { set } from "../redux/actions/signup";
import { useDispatch } from "react-redux";

export default function SignUp(props) {
	const dispatch = useDispatch();
	const [error, setError] = useState(false);
	const [valid, setValid] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		const id = setTimeout(async () => {
      try {
				const response = await backend.post(
					"/users/confirmEmail",
					JSON.stringify({ email: email }),
				);

        const exists = response.data.value;
        if (exists) {
          setError(true);
          setValid(false);
        } else {
          setError(false);
          if (isValidPassword(password)) {
            setValid(true);
          } else {
            setValid(false);
          }
        }
      } catch (e) {}
		}, 2000);

		return () => {
			clearTimeout(id);
		};
  }, [email, password]);

	const isValidEmail = (email: string): boolean => {
		return /\S+@\S+\.\S+/.test(email);
	};

	const isValidPassword = (password: string): boolean => {
		return password.length > 4;
	};

	const handleEmail = (e) => {
		dispatch(set("signup_email", e.target.value));
		setEmail(e.target.value);

		if (isValidEmail(e.target.value) && isValidPassword(password)) {
			setValid(true);
		} else setValid(false);
	};

	const handlePassword = (e) => {
		dispatch(set("signup_password", e.target.value));
		setPassword(e.target.value);

		if (isValidPassword(e.target.value) && isValidEmail(email)) {
			setValid(true);
		} else setValid(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.studio}>
				<Image src="/Logo.svg" alt="Mumble's logo" width="80" height="80" />
			</div>

			<div className={styles.signup}>
				<BackToHome />
				<p className={styles.heading}>Create an account to get started</p>

				{/* form */}
				<div className={styles.form}>
					<label className={styles.label} htmlFor="email">
						Your email
					</label>
					<input
						onChange={handleEmail}
						className={`${styles.input} ${error ? styles.error_input : ""}`}
						name="email"
						placeholder="Enter your email address"
						type="email"
					></input>
					{error ? (
						<p className={styles.error_text}>Email is already in use</p>
					) : (
						""
					)}

					<label className={styles.label} htmlFor="password">
						Your password
					</label>
					<div className={styles.password_div}>
						<input
							onChange={handlePassword}
							className={styles.password_input}
							name="password"
							placeholder="Create your password"
							type={showPassword ? "text" : "password"}
						></input>
						<button
							className={styles.show_password}
							onClick={() => setShowPassword(!showPassword)}
						>
							{password.length > 0 ? (
								<Image
									className={styles.show_password_image}
									src={
										showPassword ? "/hide_password.svg" : "/show_password.svg"
									}
									alt="show password"
									width="22"
									height="19"
								></Image>
							) : (
								""
							)}
						</button>
					</div>

					<Link href={valid ? "/signup/name" : ""} className={styles.link}>
						<button
							className={valid ? styles.active_submit : styles.submit}
							type="submit"
						>
							Get Started
						</button>
					</Link>

					<div className={styles.or}>
						<hr className={styles.line} />
						<p className={styles.or_p}>Or</p>
						<hr className={styles.line} />
					</div>

					<p className={styles.signup_with}>Sign up with</p>

					<Link href="" className={styles.link}>
						<div className={styles.border}>
							<div className={styles.google_signup}>
								<Image
									src="/Google.svg"
									alt="Google logo"
									width="24"
									height="24"
									style={{
										marginRight: "8px",
									}}
								></Image>
								<p>Sign Up With Google</p>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}

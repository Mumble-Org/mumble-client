import Image from "next/image";
import Link from "next/link";
import styles from "../styles/login.module.css";
import { BackToHome } from "../components/buttons/buttons";
import { Loading } from "../components/loading";
import { useState } from "react";
import { backend } from "../utils/backend";
import { useRouter } from "next/router";

// redux
import { set as loginSet } from "../redux/actions/login";
import { set as userSet } from "../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";

export default function Login(props) {
	const dispatch = useDispatch();
	const router = useRouter();
	const user = useSelector((state: any) => state.login.user);
	const [valid, setValid] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	const login = async () => {
		setLoading(true);
		const body = { ...user };
		let response;

		try {
			response = await backend.post("/users/login", body);

			if (response.status === 200) {
				dispatch(userSet("user", response.data.user));
				dispatch(userSet("token", response.data.token));
				console.log(response.data);
				router.push("/");
			}
		} catch (error) {
			setError(true);
			setValid(false);
		}
		setLoading(false);
	};

	const isValidEmail = (email: string): boolean => {
		return /\S+@\S+\.\S+/.test(email);
	};

	const isValidPassword = (password: string): boolean => {
		return password.length > 4;
	};

	const handleEmail = (e) => {
		dispatch(loginSet("login_email", e.target.value));
		setEmail(e.target.value);

		if (isValidEmail(e.target.value) && isValidPassword(password)) {
			setValid(true);
			setError(false);
		} else setValid(false);
	};

	const handlePassword = (e) => {
		dispatch(loginSet("login_password", e.target.value));
		setPassword(e.target.value);

		if (isValidPassword(e.target.value) && isValidEmail(email)) {
			setValid(true);
			setError(false);
		} else setValid(false);
	};

	return (
		<div className={styles.container}>
			{loading ? <Loading /> : ""}
	
			<div className={styles.studio}>
				<Image src="/Logo.svg" alt="Mumble's logo" width="80" height="80" />
			</div>

			<div className={styles.signup}>
				<BackToHome />
				<p className={styles.heading}>Login to your account</p>

				{/* form */}
				<div className={styles.form}>
					<label className={styles.label} htmlFor="email">
						Your email
					</label>
					<input
						onChange={handleEmail}
						className={`${styles.input} ${error ? styles.input_error : ""}`}
						name="email"
						placeholder="Enter your email address"
						type="email"
					></input>
					{error ? (
						<p className={styles.error_message}>Email or password incorrect</p>
					) : (
						""
					)}

					<label className={styles.label} htmlFor="password">
						Your password
					</label>
					<div
						className={`${styles.password_div} ${
							error ? styles.input_error : ""
						}`}
					>
						<input
							onChange={handlePassword}
							className={styles.password_input}
							name="password"
							placeholder="Enter your password"
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
					{error ? (
						<p className={styles.error_message}>Email or password incorrect</p>
					) : (
						""
					)}

					<div onClick={valid ? login : () => {}} className={styles.link}>
						<button
							className={valid ? styles.active_submit : styles.submit}
							type="submit"
						>
							Login
						</button>
					</div>

					<div className={styles.or}>
						<hr className={styles.line} />
						<p className={styles.or_p}>Or</p>
						<hr className={styles.line} />
					</div>

					<p className={styles.signup_with}>Login with</p>

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
								<p>Login With Google</p>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}

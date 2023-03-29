import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/producer/signup.module.css';
import { BackToHome } from '../../components/buttons';
import { useState } from 'react';


export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  return (
      <div className={styles.container}>
        <div className={styles.studio}>
          <Image
            src="/Logo.svg"
            alt="Mumble's logo"
            width="80"
            height="80"
          />
        </div>

        <div className={styles.signup}>
          <BackToHome/>
          <p className={styles.heading}>Create an account to get started</p>
        
        {/* form */}
        <div className={styles.form}>
          <label className={styles.label} htmlFor="email">Your email</label>
          <input
            className={styles.input}
            name="email"
            placeholder="Enter your email address"
            type="email">
          </input>

          <label className={styles.label} htmlFor="password">Your password</label>
          <div className={styles.password_div}>
            <input
              className={styles.password_input}
              name="password"
              placeholder="Create your password"
              type={showPassword ? "text" : "password"}>
            </input>
            <button
              className={styles.show_password}
              onClick={() => setShowPassword(!showPassword)}
            >
              <Image
                className={styles.show_password_image}
                src="/show_password.svg"
                alt="show password"
                width="22"
                height="19"
              ></Image>
            </button>
          </div>

          <button
            className={styles.submit}
            type="submit">
            Get Started
          </button>

          <div className={styles.or}>
            <hr className={styles.line} />
            <p className={styles.or_p}>Or</p>
            <hr className={styles.line} />
          </div>

          <p className={styles.signup_with}>Sign up with</p>

          <Link href="" className={styles.google}>
            <div className={styles.border}>
              <div className={styles.google_signup}>
                <Image
                  src="/Google.svg"
                  alt="Google logo"
                  width="24"
                  height="24"
                  style={{
                    marginRight: "8px"
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
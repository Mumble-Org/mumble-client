import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/login.module.css';
import { BackToHome } from '../components/buttons/buttons';
import { useState } from 'react';
import { backend } from '../utils/backend';
import { useRouter } from 'next/router';

// redux
import { set } from '../redux/actions/login';
import { useDispatch, useSelector } from 'react-redux';


export default function Login(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: any) => state.login.user);
  const [valid, setValid] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const login = async () => {
		const body = { ...user };
		
    const response = await backend.post('/login', body);

		if (response.status === 200) {
			localStorage.setItem('token', response.data.user.token);
			router.push('/');
		}
	}

  const isValidEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  }

  const isValidPassword = (password: string): boolean => {
    return password.length > 4
  }

  const handleEmail = (e) => {
    dispatch(set('login_email', e.target.value));
    setEmail(e.target.value);

    if (isValidEmail(e.target.value) && isValidPassword(password)) {
      setValid(true);
    } else
      setValid(false);
  }

  const handlePassword = (e) => {
    dispatch(set('login_password', e.target.value));
    setPassword(e.target.value);

    if (isValidPassword(e.target.value) && isValidEmail(email)) {
      setValid(true);
    } else
      setValid(false);
  }

  return (
      <div className={styles.container}>
        <div className={styles.studio}>
          <Image
            src='/Logo.svg'
            alt="Mumble's logo"
            width='80'
            height='80'
          />
        </div>

        <div className={styles.signup}>
          <BackToHome/>
          <p className={styles.heading}>Login to your account</p>
        
        {/* form */}
        <div className={styles.form}>
          <label className={styles.label} htmlFor='email'>Your email</label>
          <input
            onChange={handleEmail}
            className={styles.input}
            name='email'
            placeholder='Enter your email address'
            type='email'>
          </input>

          <label className={styles.label} htmlFor='password'>Your password</label>
          <div className={styles.password_div}>
            <input
              onChange={handlePassword}
              className={styles.password_input}
              name='password'
              placeholder='Enter your password'
              type={showPassword ? 'text' : 'password'}>
            </input>
            <button
              className={styles.show_password}
              onClick={() => setShowPassword(!showPassword)}
            >
              {password.length > 0 ? <Image
                className={styles.show_password_image}
                src={showPassword ? '/hide_password.svg' : '/show_password.svg'}
                alt='show password'
                width='22'
                height='19'
              ></Image> : ''}
            </button>
          </div>

          <div onClick={valid ? login : () => {}} className={styles.link}>
            <button
              className={valid ? styles.active_submit : styles.submit}
              type='submit'>
              Login
            </button>
          </div>

          <div className={styles.or}>
            <hr className={styles.line} />
            <p className={styles.or_p}>Or</p>
            <hr className={styles.line} />
          </div>

          <p className={styles.signup_with}>Login with</p>

          <Link href='' className={styles.link}>
            <div className={styles.border}>
              <div className={styles.google_signup}>
                <Image
                  src='/Google.svg'
                  alt='Google logo'
                  width='24'
                  height='24'
                  style={{
                    marginRight: '8px'
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

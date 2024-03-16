"use client";
import styles from "../css/page.module.css";
import signupStyles from "../css/signup.module.css";
import Link from 'next/link';
import React, { useState } from "react";
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye';
import {x} from 'react-icons-kit/feather/x';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [confirmPasswordType, setConfirmPasswordType] = useState('password');
  const [passwordIcon, setPasswordIcon] = useState(eyeOff);
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(eyeOff);
  const [XIcon, setXIcon] = useState(x);
  const [submitted, setSubmitted] = useState(false);


  const handlePasswordToggle = () => {
    if (passwordType === 'password') {
      setPasswordIcon(eye);
      setPasswordType('text');
    } else {
      setPasswordIcon(eyeOff);
      setPasswordType('password');
    }
  } // handleToggle

  const handleConfirmPasswordToggle = () => {
    if (confirmPasswordType === 'password') {
      setConfirmPasswordIcon(eye);
      setConfirmPasswordType('text');
    } else {
      setConfirmPasswordIcon(eyeOff);
      setConfirmPasswordType('password');
    }
  } // handleToggle

  const handleXtoggle = () => {
    if (errorMessage !== '') {
      setErrorMessage('');
      setXIcon(x);
    }
  } // handleToggle

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setErrorMessage('');

    // add further username validation here  
    if (!username || !password) {
      setErrorMessage('Error: All fields are required!');
    } else if (username.length < 4 || password.length < 8) {
      if (username.length < 4 && password.length < 8) {
        setErrorMessage('Error: Invalid username and password');
      } else if (username.length < 4) {
        setErrorMessage('Error: Invalid username');
      } else if (password.length < 8) {
        setErrorMessage('Error: Invalid password');
      }
    }
  } // handleSubmit

  return (
  <main className={styles.main}>
    <div className={styles.signup}>
      <img
          className={styles.img}
          src="/_next/static/media/icon_transparent.e1a2640c.png"
          alt="Grapefruit slice atop a pile of other slices" 
        />
      <div className={signupStyles.title}><h1>
        Sign Up
      </h1></div>
      <form onSubmit={handleSubmit}>
        <div className={styles.form}>
          <div className={signupStyles.inputName}>
            <div className={signupStyles.inputBox1}>
              <label htmlFor="firstName">
                First Name
              </label>
              <input
                className={`${styles.input} ${submitted && username.length < 4   && styles.error}`}
                type="text" 
                name="firstName" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              >
              </input>
            </div>
            <div className={signupStyles.inputBox2}>
              <label htmlFor="lastName">
                Last Name
              </label>
              <input
                className={`${styles.input} ${submitted && username.length < 4   && styles.error}`}
                type="text" 
                name="lastName" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              >
              </input>
            </div>
            </div>

            <div className={signupStyles.inputInfo}>
            <div className={signupStyles.inputBox}>
              <label htmlFor="email">
                Email
              </label>
              <input type="email" id="email" name="email" required></input>
            </div>
            <div className={signupStyles.inputBoxPass}>
              <label htmlFor="Password">
                Password
              </label>
              <input
                className={`${styles.input} ${submitted && password.length < 8 && styles.error}`}
                style={{marginLeft: '1vw'}}
                  type={passwordType}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
              >
              </input>
              <span className={styles.eye} onClick={handlePasswordToggle}>
              <Icon icon={passwordIcon} size={"1vw"}/>
             </span>
            </div>
            <div className={signupStyles.inputBoxPass}>
              <label htmlFor="confirmPassword">
                Password Confirmation
              </label>
              <input
                className={`${styles.input} ${submitted && password.length < 8 && styles.error}`}
                style={{marginLeft: '1vw'}}
                  type={confirmPasswordType}
                  name="confirmPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
              >
              </input>
              <span className={styles.eye} onClick={handleConfirmPasswordToggle}>
              <Icon icon={confirmPasswordIcon} size={"1vw"}/>
             </span>
            </div>
            </div>

            <div className={signupStyles.checkbox}>
              <input type="checkbox" id="termsCheckbox" name="termsCheckbox" required></input>
              <label htmlFor="termsCheckbox">
              I agree to the {" "}
              <Link style={{ color: 'grey' }} href="https://maizepages.umich.edu/organization/innovationforimpact">
                Terms and Conditions
              </Link>
              </label>
            </div>

            { errorMessage && (
              <div>          
              <p className={styles.errorMessage}>
                {errorMessage}
                <span className={styles.x} onClick={handleXtoggle}>
                  <Icon icon={XIcon} size={"1vw"}/>
                </span>
              </p>
              </div>
            )}

            <button> SIGN UP </button>
            <p>
              Already have an account? {" "}
              <Link className={styles.a} href="/">
                Login
              </Link>
            </p>
        </div>
      </form>
    </div>

    <footer>
      <p>&copy; Innovation for Impact 2024</p>
    </footer>
  </main>
  );
}
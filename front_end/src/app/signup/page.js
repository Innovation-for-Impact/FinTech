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
  const [firstName, setFirst] = useState('');
  const [lastName, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checkBox, setCheckBox] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [confirmPasswordType, setConfirmPasswordType] = useState('password');
  const [firstNameType, setFirstType] = useState('name');
  const [lastNameType, setLastType] = useState('name');
  const [emailType, setEmailType] = useState('email');
  const [checkBoxType, setCheckBoxType] = useState('checkBox');
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

  const handleKeyClick = (e, handler) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handler();
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setErrorMessage('');

    // add further username validation here  
    if (!firstName || !lastNameType || !password || !confirmPassword || !email) {
      setErrorMessage('Error: All fields are required!');
    } else if (email.length < 11 || password.length < 8) {
      if (email.length < 11 && password.length < 8) {
        setErrorMessage('Error: Invalid email and password');
      } else if (email.length < 11) {
        setErrorMessage('Error: Invalid email');
      } else if (password.length < 8) {
        setErrorMessage('Error: Invalid password');
      }
    } else if (confirmPassword != password) {
      setErrorMessage('Error: Password confirmation does not match');
    }
    else if (document.getElementById("termsCheckbox").checked==false) {
      setErrorMessage('Error: Did not check Terms and Conditions');
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
                className={`${styles.input} ${submitted && !firstName && styles.error_signup}`}
                type={firstNameType}
                name="firstName" 
                value={firstName}
                onChange={(e) => setFirst(e.target.value)}
                // required
              >
              </input>
            </div>
            <div className={signupStyles.inputBox2}>
              <label htmlFor="lastName">
                Last Name
              </label>
              <input
                className={`${styles.input} ${submitted && !lastName && styles.error_signup}`}
                type={lastNameType}
                name="lastName" 
                value={lastName}
                onChange={(e) => setLast(e.target.value)}
                // required
              >
              </input>
            </div>
            </div>

            <div className={signupStyles.inputInfo}>
            <div className={signupStyles.inputBox}>
              <label htmlFor="email">
                Email
              </label>
              <input
                className={`${styles.input} ${submitted && email < 11 && styles.error_signup}`}
                type={emailType}
                name="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // required
              >
              </input>
            </div>
            <div className={signupStyles.inputBoxPass}>
              <label htmlFor="Password">
                Password
              </label>
              <input
                  className={`${styles.input} ${submitted && password.length < 8 && styles.error_signup}`}
                  type={passwordType}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // autoComplete="current-password"
                  // required
              >
              </input>
              <span
                className={styles.eye}
                tabIndex="0"
                onClick={handlePasswordToggle}
                onKeyDown={(e) => handleKeyClick(e, handlePasswordToggle)}
              >
              <Icon icon={passwordIcon} size={"1vw"}/>
             </span>
            </div>
            <div className={signupStyles.inputBoxPass}>
              <label htmlFor="confirmPassword">
                Password Confirmation
              </label>
              <input
                  className={`${styles.input} ${submitted && (confirmPassword !== password || !confirmPassword) && styles.error_signup}`}
                  type={confirmPasswordType}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  // autoComplete="current-password"
                  // required
              >
              </input>
              <span
                className={styles.eye}
                tabIndex="0"
                onClick={handlePasswordToggle}
                onKeyDown={(e) => handleKeyClick(e, handleConfirmPasswordToggle)}
              >
              <Icon icon={confirmPasswordIcon} size={"1vw"}/>
             </span>
            </div>
            </div>

            <div className={signupStyles.checkbox}>
              <input
                  type={checkBoxType}
                  name="checkBox"
                  id="termsCheckbox"
                  value={checkBox}
                  onChange={(e) => setCheckBox(e.target.value)}
                  // required
              >
              </input>
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
                <span
                  className={styles.x_signup}
                  tabIndex="0"
                  onClick={handleXtoggle}
                  onKeyDown={(e) => handleKeyClick(e, handleXtoggle)}
                >
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
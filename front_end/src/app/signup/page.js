"use client";
import styles from "../css/page.module.css";
import signupStyles from "../css/signup.module.css";
import Link from 'next/link';
import React, { useState } from "react";
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye';
import {x} from 'react-icons-kit/feather/x';
import { useCookies } from "next-client-cookies";

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
  const cookies = useCookies();

  // show or hide password based on user preference
  // (ie. eye toggle button)
  const handlePasswordToggle = () => {
    if (passwordType === 'password') {
      setPasswordIcon(eye);
      setPasswordType('text');
    } else {
      setPasswordIcon(eyeOff);
      setPasswordType('password');
    }
  } // handlePasswordToggle

  // show or hide confirmation password based on user preference
  const handleConfirmPasswordToggle = () => {
    if (confirmPasswordType === 'password') {
      setConfirmPasswordIcon(eye);
      setConfirmPasswordType('text');
    } else {
      setConfirmPasswordIcon(eyeOff);
      setConfirmPasswordType('password');
    }
  } // handleConfirmPasswordToggle

  // hide the error message based on user preference 
  const handleXtoggle = () => {
    if (errorMessage !== '') {
      setErrorMessage('');
      setXIcon(x);
    }
  } // handleXtoggle

  // allow keyboard access to 'submit' button
  const handleKeyClick = (e, handler) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handler();
    }
  } // handleKeyClick

  // handle error messages and valid input data when user submits
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setErrorMessage('');

    // if there is an error, create an error message
    if (!firstName || !lastNameType || !password || !confirmPassword || !email) {
      setErrorMessage('Error: All fields are required!');
    } // if username/pssword length is too short
    else if (email.length < 11 || password.length < 8) {
      if (email.length < 11 && password.length < 8) {
        setErrorMessage('Error: Invalid email and password');
      } else if (email.length < 11) {
        setErrorMessage('Error: Invalid email');
      } else if (password.length < 8) {
        setErrorMessage('Error: Invalid password');
      }
    } // if password confirmation and password are not identical
    else if (document.getElementById("termsCheckbox").checked==false) {
      setErrorMessage('Error: Did not check Terms and Conditions');
    } // if there are no errors (sign up successful), redriect to the verify page
    else { 
      const data = new FormData(e.currentTarget);
      fetch(e.currentTarget.action, {
        method: e.currentTarget.method,
        body: data
      })
      .then(res => {
        if(!res.ok)
          throw new Error(res);
        return res.json();
      })
      .then(json => {
        if(json["code"] === "400") {
          setErrorMessage(json["error"])
          return;
        }
      })
      .catch(err => {
        console.log(err);
        setErrorMessage("Encountered an error")
      })
      // make sure to include "email" data
      //window.location.href = `/signup/verify?email=${encodeURIComponent(email)}`;
      // window.location.href = '/signup/verify';
    }
  } // handleSubmit

  return (
  <main className={styles.main}>
    <div className={styles.signup}>
      <img
        className={styles.img}
        src="/_next/static/media/icon_transparent.e1a2640c.png"
        alt="Innovation for Impact logo" 
      />

      <div className={signupStyles.title}>
        <h1>Sign Up</h1>
      </div>
      
      <form onSubmit={handleSubmit} method="post" action="/api/account/signup/">
        <div className={styles.form}>

          {/* accept FIRST and LAST NAME input */}
          <div className={signupStyles.inputName}>
            {/* accept FIRST NAME */}
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
              />
            </div>

            {/* accept LAST NAME */}
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
              />
            </div>
          </div>

          {/* accept EMAIL/PASSWORD/CONFIRMATION PASSWORD input */}
          <div className={signupStyles.inputInfo}>
            {/* accept EMAIL */}
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
              />
            </div>

            {/* accept PASSWORD */}
            <div className={signupStyles.inputBoxPass}>
              <label htmlFor="password1">
                Password
              </label>
              <input
                className={`${styles.input} ${submitted && password.length < 8 && styles.error_signup}`}
                type={passwordType}
                name="password1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              
              {/* include eye icon for PASSWORD toggle */}
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
              <label htmlFor="password2">
                Password Confirmation
              </label>
              <input
                  className={`${styles.input} ${submitted && (confirmPassword !== password || !confirmPassword) && styles.error_signup}`}
                  type={confirmPasswordType}
                  name="password2"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {/* include eye icon for CONFIRMATION PASSWORD toggle */}
              <span
                className={styles.eye}
                tabIndex="0"
                onClick={handleConfirmPasswordToggle}
                onKeyDown={(e) => handleKeyClick(e, handleConfirmPasswordToggle)}
              >
                <Icon icon={confirmPasswordIcon} size={"1vw"}/>
              </span>
            </div>
          </div>

          {/* checkbox to allow user to accept TERMS */}
          <div className={signupStyles.checkbox}>
            <input
                type={checkBoxType}
                name="checkBox"
                id="termsCheckbox"
                value={checkBox}
                onChange={(e) => setCheckBox(e.target.value)}
            />
            <label htmlFor="termsCheckbox">
              I agree to the {" "}
              <Link style={{ color: 'grey' }} href="https://maizepages.umich.edu/organization/innovationforimpact">
                Terms and Conditions
              </Link>
            </label>
          </div>

          {/* incorporate error message based on user input */}
          { errorMessage && (
            <div>          
            <p className={styles.errorMessage}>
              {errorMessage}

              {/* include X for hiding error message */}
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

          <input 
            className="hidden"
            name="csrfmiddlewaretoken"
            value={cookies.get("csrftoken")}
            readOnly={true}
          />

          {/* allow user to submit the form */}
          <button> 
            SIGN UP 
          </button>
          
          {/* allow user to login (redirect to LOGIN) */}
          <p>
            Already have an account? {" "}
            <Link className={styles.a} href="/">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>

    {/* include copyright footer */}
    <footer>
      <p>&copy; Innovation for Impact 2024</p>
    </footer>
  </main>
  );
}
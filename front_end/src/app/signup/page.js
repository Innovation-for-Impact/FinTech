"use client";
import styles from "../css/page.module.css";
import signupStyles from "../css/signup.module.css";
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/innofunds-logo-transparent.png';
import React, { useState } from "react";
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye';
import {x} from 'react-icons-kit/feather/x';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Home() {
  const [firstName, setFirst] = useState('');
  const [lastName, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checkBox, setCheckBox] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [confirmPasswordType, setConfirmPasswordType] = useState('password');
  const [passwordIcon, setPasswordIcon] = useState(eyeOff);
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(eyeOff);
  const [XIcon, setXIcon] = useState(x);
  const [submitted, setSubmitted] = useState(false);

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

    // TODO backend: add further username validation here  

    // if there is an error, create an error message
    if (!firstName || !lastName || !password || !confirmPassword || !email) {
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
    else if (confirmPassword != password) {
      setErrorMessage('Error: Password confirmation does not match');
    } // if user has not agreed to terms and conditions
    else if (!checkBox) {
      setErrorMessage('Error: Did not check Terms and Conditions');
    } // if there are no errors (sign up successful), redriect to the verify page
    else { 
      // make sure to include "email" data
      window.location.href = `/signup/verify?email=${encodeURIComponent(email)}`;
      // window.location.href = '/signup/verify';
    }
  } // handleSubmit

  return (
  <main className={styles.main}>
    <div className={styles.signup}>
    <Image 
      className={styles.img}
      src={logo}
      alt="Innofunds Logo"
      layout="intrinsic"
    />

      <div className={signupStyles.title}>
        <h1>Sign Up</h1>
      </div>
      
      <Form onSubmit={handleSubmit} className={styles.form}>
          {/* accept FIRST NAME */}
          <Form.Group className={signupStyles.inputBox1}>
            <Form.Label className={signupStyles.formLabel}>First Name</Form.Label>
            <Form.Control
              type="text"
              value={firstName}
              className={`${styles.input} ${submitted && !firstName && styles.error_signup}`}
              onChange={(e) => setFirst(e.target.value)}
              aria-label="first name"
            />
          </Form.Group>

          {/* accept LAST NAME */}
          <Form.Group className={signupStyles.inputBox2}>
            <Form.Label className={signupStyles.formLabel}>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={lastName}
              className={`${styles.input} ${submitted && !lastName && styles.error_signup}`}
              onChange={(e) => setLast(e.target.value)}
              aria-label="last name"
            />
          </Form.Group>

        {/* accept EMAIL/PASSWORD/CONFIRMATION PASSWORD input */}
        {/* accept EMAIL */}
        <Form.Group className={signupStyles.inputBox3}>
          <Form.Label className={signupStyles.formLabel}>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            className={`${styles.input} ${submitted && email.length < 11 && styles.error_signup}`}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="email"
          />
        </Form.Group>

        {/* accept PASSWORD */}
        <Form.Group className={signupStyles.inputBox4}>
          <Form.Label className={signupStyles.formLabel}>Password</Form.Label>
          <Form.Control
            type={passwordType}
            value={password}
            className={`${styles.input} ${submitted && password.length < 8 && styles.error_signup}`}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="password"
          />
          <Icon icon={passwordIcon} onClick={handlePasswordToggle} className={styles.eye} tabIndex={0}/>
        </Form.Group>

        {/* accept CONFIRM PASSWORD */}
        <Form.Group className={signupStyles.inputBox5}>
          <Form.Label className={signupStyles.formLabel}>Confirm Password</Form.Label>
          <Form.Control
            type={confirmPasswordType}
            value={confirmPassword}
            className={`${styles.input} ${submitted && confirmPassword !== password && styles.error_signup}`}
            onChange={(e) => setConfirmPassword(e.target.value)}
            aria-label="confirm password"
          />
          <Icon icon={confirmPasswordIcon} onClick={handleConfirmPasswordToggle} className={styles.eye} tabIndex={0}/>
        </Form.Group>

        {/* checkbox to allow user to accept TERMS */}
        <Form.Group className={signupStyles.checkbox}>
            <Form.Check
              type="checkbox"
              label={<span>I agree to the <Link href="https://maizepages.umich.edu/organization/innovationforimpact">Terms and Conditions</Link></span>}
              checked={checkBox}
              onChange={(e) => setCheckBox(e.target.checked)}
            />
          </Form.Group>

        {/* incorporate error message based on user input */}
        {errorMessage && (
          <div>          
          <p className={styles.errorMessageSignup}>
            {errorMessage}

            {/* include X for hiding error message */}
            <span
              className={styles.x_signup}
              tabIndex="0"
              onClick={handleXtoggle}
              onKeyDown={(e) => handleKeyClick(e, handleXtoggle)}
            >
              <Icon icon={XIcon} font-size={"1vw"}/>
            </span>
          </p>
          </div>
        )}

        {/* allow user to submit the form */}
        <Button variant="primary" type="submit"> 
          SIGN UP 
        </Button>
        
        {/* allow user to login (redirect to LOGIN) */}
        <p>
          Already have an account? {" "}
          <Link className={styles.a} href="/">
            Login
          </Link>
        </p>
      </Form>
    </div>

    {/* include copyright footer */}
    <footer>
      <p>&copy; Innovation for Impact 2024</p>
    </footer>
  </main>
  );
}
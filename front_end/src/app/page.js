"use client";
import styles from "../app/css/page.module.css";
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/innofunds-logo-transparent.png';
import React, { useState } from "react";
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye';
import {x} from 'react-icons-kit/feather/x';
import { useCookies } from 'next-client-cookies';
import Head from 'next/head';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const backend_url = "http://localhost:8000"

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const [XIcon, setXIcon] = useState(x);
  const [submitted, setSubmitted] = useState(false);
  const cookies = useCookies();

  // show or hide password based on user preference 
  // (ie. eye toggle button)
  const handleToggle = () => {
    if (type==='password'){
       setIcon(eye)
       setType('text')
    } else {
       setIcon(eyeOff)
       setType('password')
    }
  } // handleToggle

  // hide the error message based on user preference 
  const handleXtoggle = () => {
    if (errorMessage !== '') {
      setErrorMessage('');
      setXIcon(x);
    }
  } // handleToggle

  // allow keyboard access to 'login' button
  const handleKeyClick = (e, handler) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handler();
    }
  } // handleKeyClick

  // handle error messages and username/password when user submits 
  // note: fetch (url) 
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const data = new FormData(e.currentTarget)
    const dataJson = Object.fromEntries(data.entries());
    const dataJsonString = JSON.stringify(dataJson);
    console.log(dataJsonString);

    //TODO: error check here (empty fields etc before sending fetch request)
    // user authentication done by back end

    // Find auth api info here https://django-rest-auth.readthedocs.io/en/latest/api_endpoints.html
    // Mess around with different api requests on localhost:8000/api/v1/<api endpoint>
    // once you start the backend server

    fetch (e.target.action, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: dataJsonString
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      if(data.access) {
        // successfully logged in
        // set cookie to data.access
        localStorage.setItem('access', data.access);
        window.location.href= '/home';
      }
      else {
        // error messages
        if (data.email) {
          setErrorMessage(data.email);
        }
        else if (data.password) {
          setErrorMessage("Password may not be blank");
        }
        else if(data.non_field_errors) {
          setErrorMessage(data.non_field_errors);
        }
        else {
          setErrorMessage("You goofed up");
        }
      }
    })
    .catch(error => {
      console.error("error", error);
    })
  } // handleSubmit

  return (
    <main className={styles.main}>
    <div className={styles.login}>
    <Image 
      className={styles.img}
      src={logo}
      alt="Innofunds Logo"
      layout="intrinsic"
    />

      <div className={styles.title}>
        <h1>WELCOME BACK!</h1>
      </div>

      <Form action={`${backend_url}/api/v1/auth/login/`} method="POST" onSubmit={handleSubmit}>
        <div className={styles.info}>
          {/* accept EMAIL */}
          <Form.Group>
            <Form.Control
              className= {`${styles.input} ${submitted && email.length < 4 && styles.error}`}
              placeholder="Email" // placeholder word (ie. shows up in gray-ed out font)
              name="email"  // allow auto-fill
              aria-label="Email"
              value={email} // save input to variable
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          {/* accept PASSWORD */}
          <Form.Group className={styles.input_password}>
            <Form.Control
              className={`${styles.input} ${submitted && password.length < 8 && styles.error}`}
              style={{marginLeft: '1vw'}}
              type={type}
              placeholder="Password"
              name="password"
              aria-label="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            {/* include eye icon for PASSWORD toggle */}
            <Icon icon={icon} onClick={handleToggle} className={styles.eye_login} tabIndex={0}/>
          </Form.Group>

          {/* <input
           className="hidden"
           name="csrfmiddlewaretoken"
           value={cookies.get("csrftoken")}
           readOnly={true}
         /> */}
          
          {/* provide link to recover account (redirect to RECOVER)*/}
          <p className={styles.forgot}>
            <Link href="/recover">
                Forgot Password?
            </Link>
          </p>

          {/* incorporate error message based on USERNAME/PASSWORD */}
          { errorMessage && (
            <div>          
            <p className={styles.errorMessage}>
              {errorMessage}
              
              {/* include X for hiding error message */}
              <span
                className={styles.x}
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
            LOGIN
          </Button>

          {/* allow user to create an account (redirect to SIGN UP) */}
          <p className={styles.noAccount}>
              Don't have an account?{" "}  
              <Link className={styles.a} href="/signup">
                Sign Up
              </Link>
          </p>
        </div>
      </Form>
    </div>

    {/* include copyright footer */}
    <footer>	
      <p>&copy; Innovation for Impact 2024</p>	
    </footer>	
  </main>
  );
}
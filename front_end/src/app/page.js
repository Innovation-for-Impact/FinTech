"use client";
import styles from "../app/css/page.module.css";
import Link from 'next/link';
import logo from '../app/images/icon_transparent.png';
import React, { useState } from "react";
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye';
import {x} from 'react-icons-kit/feather/x';
import { useCookies } from 'next-client-cookies';

export default function Home() {
  const [username, setUsername] = useState('');
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
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setErrorMessage('');
    // TODO backend: 
    //  - add further username validation here 
    //  - also edit: form > input > username/password "className" attribute
    
    // if there is an error, create an error message
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
    } else {
      const data = new FormData(e.currentTarget)
      fetch(e.target.action, {
        method: "post",
        body: data
      }).then(res => {
        return res.json();
      }).then(json => {
        if(json["code"] === "400")
          setErrorMessage(json["error"]);
        else
          console.log(json);
      }).catch(err => {
        console.error(err);
      })
    }
  } // handleSubmit

  return (
    <main className={styles.main}>
    <div className={styles.login}>
      <img
        className={styles.img}
        src="/_next/static/media/icon_transparent.e1a2640c.png"
        alt="Innovation for Impact Logos" 
      />

      <div className={styles.title}>
        <h1>WELCOME BACK!</h1>
      </div>

      <form action="/api/auth/login/" method="POST" onSubmit={handleSubmit}>
        <div className={styles.info}>
          {/* accept USERNAME */}
          <input 
            className= {`${styles.input} ${submitted && username.length < 4 && styles.error}`}
            placeholder="Email" // placeholder word (ie. shows up in gray-ed out font)
            name="email"  // allow auto-fill
            value={username} // save input to variable
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* accept PASSWORD */}
          <input
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

          <input 
            className="hidden"
            name="csrfmiddlewaretoken"
            value={cookies.get("csrftoken")}
            readOnly={true}
          />

          {/* include eye icon for PASSWORD toggle */}
          <span
            className={styles.eye}
            tabIndex="0"
            onClick={handleToggle}
            onKeyDown={(e) => handleKeyClick(e, handleToggle)}
          >
            <Icon icon={icon} fontSize={"1vw"}/>
          </span>

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
          <button> 
              LOGIN
          </button>

          {/* allow user to create an account (redirect to SIGN UP) */}
          <p className={styles.noAccount}>
              Don't have an account?{" "}  
              <Link className={styles.a} href="/signup">
                Sign Up
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
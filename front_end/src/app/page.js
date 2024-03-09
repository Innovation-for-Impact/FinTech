"use client";
import Image from "next/image";
import styles from "../app/css/page.module.css";
import logo from '../app/images/icon_transparent.png';
import Link from 'next/link';
import React, { useState } from "react";
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye';

// https://stackoverflow.com/questions/74965849/youre-importing-a-component-that-needs-usestate-it-only-works-in-a-client-comp
// https://dev.to/annaqharder/hideshow-password-in-react-513a

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const [submitted, setSubmitted] = useState(false);

  const handleToggle = () => {
    if (type==='password'){
       setIcon(eye);
       setType('text')
    } else {
       setIcon(eyeOff)
       setType('password')
    }
  } // handleToggle

  const handleXtoggle = () => {
    if (errorMessage !==''){
       setErrorMessage('');
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
  } // handleSubit


  // const handleLogin = async () => {
  //   const response = await fetch('/login/', {
  //       method: 'POST',
  //       headers: {
  //           'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //       body: new URLSearchParams({
  //           'username': 'your_username',  // Update with actual username
  //           'password': password,
  //       }),
  //   });
  //   const data = await response.json();
  //   if (data.success) {
  //       alert('Login successful!');
  //   } else {
  //       alert('Login failed. ' + data.error);
  //   }
  // }
  // return (
  //     // ... (your existing JSX)
  //     <button onClick={handleLogin}>LOGIN</button>
  //     // ... (your existing JSX)
  // );



  return (
    <main className={styles.main}>
    <div className={styles.login}>
      <img
        className={styles.img}
        src="/_next/static/media/icon_transparent.e1a2640c.png"
        alt="Innovation for Impact Logos" 
      />
      <h1>WELCOME BACK!</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.info}>
            <input 
              className={`${styles.input} ${submitted && username.length < 4   && styles.error}`}
              type="text" 
              name="username" 
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              // required
              />

            <input
              className={`${styles.input} ${submitted && password.length < 8 && styles.error}`}
              style={{marginLeft: '1vw'}}
                type={type}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                // required
             />

             <span className={styles.eye} onClick={handleToggle}>
              <Icon icon={icon} size={"1vw"}/>
             </span>

          <p className={styles.forgot}>
            <Link href="/recover">
                Forgot Password?
            </Link>
          </p>

          { errorMessage && (
            <div>          
            <p className={styles.errorMessage}>
              {errorMessage}
              <span className={styles.x} onClick={handleXtoggle}>
                <Icon icon={icon} size={"1vw"}/>
              </span>
            </p>
            </div>
          )}

          <button> 
            LOGIN 
          </button>

          <p className={styles.noAccount}>
              Don't have an account?{" "}  
                <Link className={styles.a} href="/signup">
                  Sign Up
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
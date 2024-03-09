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
  const [password, setPassword] = useState('');
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type==='password'){
       setIcon(eye);
       setType('text')
    } else {
       setIcon(eyeOff)
       setType('password')
    }
 }

  return (
    <main className={styles.main}>
    <div className={styles.login}>
      <img
        className={styles.img}
        src="/_next/static/media/icon_transparent.e1a2640c.png"
        alt="Innovation for Impact Logos" 
      />
      <h1>WELCOME BACK!</h1>
        <div className={styles.info}>
            <input 
              className={styles.input}
              type="text" 
              name="username" 
              placeholder="Username"
              required ></input>

            <input
                className={styles.input}
                style={{marginLeft: '1vw'}}
                type={type}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
             />

             <span className={styles.eye} onClick={handleToggle}>
              <Icon icon={icon} size={"1vw"}/>
             </span>

          <p className={styles.forgot}>
            <Link href="/recover">
                Forgot Password?
            </Link>
          </p>
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
    </div>

    <footer>	
      <p>&copy; Innovation for Impact 2024</p>	
    </footer>	
  </main>
  );
}
"use client";
import React, { useState } from "react";
import styles from "../../css/page.module.css";
import specificStyles from "../../css/recover.module.css";
import Link from 'next/link';
// import MailboxIcon from "../images/icons8-mail-48.png"

console.log("this is the verificaiton email (after signup) page");

export default function ForgotPassword() {
  const [email, setCode] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className={styles.main}>
      <div className={specificStyles.forgot}>
        
      <h1>VERIFY EMAIL</h1>
      <div>
        <p>
          Please pvovide the 6 digit code that was just sent to your account (insert account name).
        </p>
      </div>
      <form> 
      {/* <form onSubmit={handleSubmit}> */}
        <input
          className={`${specificStyles.input} ${submitted}`}
          type="code"
          placeholder="123-456"
          // value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit">
          Submit
        </button>
      </form>
      
      <p className={styles.noAccount}>
        Return to{" "}<Link className={styles.a} href="/">Login</Link>
      </p>
      </div>
      <footer>
        <p>&copy; Innovation for Impact 2024</p>
        </footer>
    </main>
  );
}
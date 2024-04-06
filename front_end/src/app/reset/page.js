"use client";
import React, { useState } from "react";
import styles from "../css/page.module.css";
import specificStyles from "../css/recover.module.css";
import Link from 'next/link';

console.log("this is the forgot password page");

export default function ForgotPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, validatePassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // incorporate submission logic
  const handleSubmit = (e) => {
    // TODO @backend --> work here
    
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className={styles.main}>
      <div className={specificStyles.forgot}>
        <h1>Rest Password</h1>
      
        {/* <img src={MailboxIcon} alt="Mailbox Icon"/> */}

        <p>
          Please enter your new password.
        </p>

        {/* accept user input (email address) through a form */}
        <form onSubmit={handleSubmit}>
          <input
            className={`${specificStyles.input} ${submitted && password.length === 0 && styles.error}`}
            placeholder="New Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // TODO Arleen: remove the "required" below and 
            // incorporate an error message if the input is not 
            // a valid email
            required
          />

          <input
            className={`${specificStyles.input} ${submitted && confirmPassword.length != password.length && styles.error}`}
            placeholder="Confirm Password"
            name="password"
            value={confirmPassword}
            onChange={(e) => validatePassword(e.target.value)}
            // TODO: remove the "required" below and 
            // incorporate an error message if the input is not 
            // a valid email
            required
          />

          {/* allow user to submit the form */}
          <button type="submit">
            Submit
          </button>

          {/* allow user to log in (redirect to LOGIN) */}
          <p className={`${styles.noAccountForgot} ${styles.a}`}>
            Return to <Link href="/signup">Login</Link>
          </p>
          
        </form>
      </div>
      
      {/* include copyright footer */}
      <footer>
        <p>&copy; Innovation for Impact 2024</p>
      </footer>
    </main>
  );
}
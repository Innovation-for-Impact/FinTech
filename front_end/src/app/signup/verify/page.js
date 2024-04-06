"use client";
import React, { useState } from "react";
import styles from "../../css/page.module.css";
import specificStyles from "../../css/recover.module.css";
import Link from 'next/link';
// import { useRouter } from 'next/router';

export default function ForgotPassword() {
  const [code, setCode] = useState('');
  const [submitted, setSubmitted] = useState(false);
  // TODO: make these work
  // const router = useRouter(); // access the router object
  // const { email } = router.query; // retrieve the email address from the query object

  // TODO: incorporate submission logic
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // TODO arleelen: uncomment the following lines 
    // if (/* submission is correct */) {
      window.location.href = '/';
    // } else {
      // create error
    // }
  } // handleSubmit

  return (
    <main className={styles.main}>
      <div className={specificStyles.forgot}>
        
      <h1>VERIFY EMAIL</h1>

      <div>
        <p>
          Please provide the 6 digit code that we sent to (email)
          {/* {email}. */}
        </p>
      </div>

      {/* accept user input (verificaiton code) through a form */}
      <form onSubmit={handleSubmit}>
        <input
          className={`${specificStyles.input} ${submitted}`}
          placeholder="123-456"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          // TODO Arleen: remove the "required" below and 
          // incorporate an error message if the input is not 
          // "123456", ignoring dashes and spaces
          required
        />

        {/* allow user to submit the form */}
        <button type="submit">
          Submit
        </button>

        {/* if user is stuck, allow them to return to previous (redirect to SIGN UP) */}
        <p className={styles.noAccount}>
          Return to{" "}
          <Link className={styles.a} href="/signup">
            Sign Up
          </Link>
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
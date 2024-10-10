"use client";
import React, { useState } from "react";
import styles from "../css/page.module.css";
import specificStyles from "../css/recover.module.css";
import Link from 'next/link';
import { useCookies } from 'next-client-cookies';
// import MailboxIcon from "../images/icons8-mail-48.png"

console.log("this is the forgot password page");

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const cookies = useCookies();

  // helper function to validate email using regEx
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // incorporate submission logic
  const handleSubmit = (e) => {
    // TODO @backend --> send email to user
    
    e.preventDefault();
    setSubmitted(true);

    // validate email format
    if(!validateEmail(email)){
      // TODO Arleen: set error message
      return;
    }
    // TODO backend: send request for recovery email backend server
    const data = new FormData(e.currentTarget)
    fetch(e.currentTarget.action, {
      method: "post",
      body: data
    })
    .then(res => {
      if(!res.ok)
        throw new Error(res);
      return res.json();
    }).then(json => {
      if(!json.ok)
        throw new Error(json);
      console.log("EMAIL SENT")
    }).catch(err => {
      console.error(err);
    })
  };

  return (
    <main className={styles.main}>
      <div className={specificStyles.forgot}>
        <h1>FORGOT PASSWORD?</h1>
      
        {/* <img src={MailboxIcon} alt="Mailbox Icon"/> */}

        <p>
          Please provide the email address associated with your account and we will share a link to reset your password!
        </p>

        {/* accept user input (email address) through a form */}
        <form onSubmit={handleSubmit} action="/api/account/reset_password/" method="POST">
          <input
            className={`${specificStyles.input} ${submitted && email.length === 0 && styles.error}`}
            placeholder="youremail@domain.com"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // TODO Arleen: remove the "required" below and 
            // incorporate an error message if the input is not 
            // a valid email
            required
          />

          <input 
            className="hidden"
            name="csrfmiddlewaretoken"
            value={cookies.get("csrftoken")}
            readOnly={true}
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
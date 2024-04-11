"use client";
import React, { useState } from "react";
import styles from "../css/page.module.css";
import specificStyles from "../css/recover.module.css";
import Link from 'next/link';
// import MailboxIcon from "../images/icons8-mail-48.png"

console.log("this is the forgot password page");

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

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
    try{
      // const response = await fetch(,{

      // }); // TODO api: add api stuff

      // if password link was went successfully
      if(response.ok){
        // TODO: display success message to user 
        // TODO: return them to login page?
      }
      else{
        // TODO: display error message, instruct them to re-request link
      }
    }
    // handle network error
    catch (error) {
      console.error('Error: ', error);
    }
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
        <form onSubmit={handleSubmit}>
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

          {/* allow user to submit the form */}
          <button type="submit">
            Submit
          </button>

          {/* allow user to log in (redirect to LOGIN) */}
          <p className={`${styles.noAccountForgot} ${styles.a}`}>
            Return to <Link href="/">Login</Link>
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
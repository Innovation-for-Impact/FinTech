"use client";
import React, { useState } from "react";
import styles from "../css/page.module.css";
import specificStyles from "../css/recover.module.css";
import Link from 'next/link';
import {Icon} from 'react-icons-kit';
import {x} from 'react-icons-kit/feather/x';
// import MailboxIcon from "../images/icons8-mail-48.png"

console.log("this is the forgot password page");

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [XIcon, setXIcon] = useState(x);

  // Function to validate email format
  const validateEmail = (email) => {
    // Use a regular expression to validate email format
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Handle submission logic here 
    // TODO @backend --> send email to user

    //Validate email format
    if(!validateEmail(email)){
      //Potential error message to the user: 
      return;
    }
    //send request to backend server (don't know how to handle this yet)
    try{
      // const response = await fetch(,{
      setShowSuccessMessage(true);
      // }); //need to add api stuff
      if(response.ok){
        //password reset was successful 
        //display success message to user 
      }
      else{
        //something went wrong
      }
    }
    catch (error) {
      //handle network error
      console.error('Error: ', error);
    }
  };

  const handleXtoggle = () => {
      setShowSuccessMessage(false);
      setXIcon(x);
  } // handleToggle

  return (
    <main className={styles.main}>
      <div className={specificStyles.forgot}>
        <h1>FORGOT PASSWORD?</h1>
        <div>
          {!showSuccessMessage && (
            <p className={specificStyles.instruction}>
              Provide the email address associated with your account and we will share a link to reset your password!
            </p>
          )}

        <form onSubmit={handleSubmit}>
          <input
            className={`${specificStyles.input} ${submitted && email.length === 0 && styles.error}`}
            type="email"
            placeholder="youremail@domain.com"
            value={email}
            aria-label="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            name="email"
            />

          {showSuccessMessage && (
            <div className={specificStyles.successMessage}>
              Email sent! Please check your inbox.
                  <span
                    className={specificStyles.x}
                    tabIndex="0"
                    onClick={handleXtoggle}
                    onKeyDown={(e) => handleKeyClick(e, handleXtoggle)}
                  >
                    <Icon icon={XIcon} font-size={"1vw"} />
                  </span>
            </div>
          )}
            
          <button type="submit">
            SUBMIT
          </button>
        </form>
        </div>
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
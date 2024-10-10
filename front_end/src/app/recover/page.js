"use client";
import React, { useState } from "react";
import styles from "../css/page.module.css";
import specificStyles from "../css/recover.module.css";
import Link from 'next/link';
<<<<<<< HEAD
import { useCookies } from 'next-client-cookies';
=======
import {Icon} from 'react-icons-kit';
import {x} from 'react-icons-kit/feather/x';
>>>>>>> 061c0135da9c24931b68ebd99e8c8e08f435b176
// import MailboxIcon from "../images/icons8-mail-48.png"

console.log("this is the forgot password page");

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
<<<<<<< HEAD
  const cookies = useCookies();
=======
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [XIcon, setXIcon] = useState(x);
  const [errorXIcon, setErrorXIcon] = useState(x);
>>>>>>> 061c0135da9c24931b68ebd99e8c8e08f435b176

  // Function to validate email format
  const validateEmail = (email) => {
    // Use a regular expression to validate email format
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setErrorMessage('');
    // Handle submission logic here 
    // TODO @backend --> send email to user

    //Validate email format
    if(!validateEmail(email)){
      //Potential error message to the user: 
      setErrorMessage('Please submit a valid email!');
      return; 
    }
<<<<<<< HEAD
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
=======
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
>>>>>>> 061c0135da9c24931b68ebd99e8c8e08f435b176
  };

  const handleXtoggle = () => {
      setShowSuccessMessage(false);
      setXIcon(x);
  } // handleToggle

  const handleErrorToggle = () => {
    if (errorMessage !== '') {
      setErrorMessage('');
      setErrorXIcon(x);
    }
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

<<<<<<< HEAD
        <p>
          Please provide the email address associated with your account and we will share a link to reset your password!
        </p>

        {/* accept user input (email address) through a form */}
        <form onSubmit={handleSubmit} action="/api/account/reset_password/" method="POST">
=======
        {/* User clicks submits and gets a success message or error message */}
        <form onSubmit={handleSubmit}>
>>>>>>> 061c0135da9c24931b68ebd99e8c8e08f435b176
          <input
            className={`${specificStyles.input} ${submitted && email.length === 0 && styles.error}`}
            type="email"
            placeholder="youremail@domain.com"
            value={email}
            aria-label="email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />

<<<<<<< HEAD
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
=======
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
>>>>>>> 061c0135da9c24931b68ebd99e8c8e08f435b176

          {/* incorporate error message based */}
          { errorMessage && (
            <div>          
            <p className={specificStyles.errorMessage}>
              {errorMessage}
              
              {/* include X for hiding error message */}
              <span
                className={specificStyles.x}
                tabIndex="0"
                onClick={handleErrorToggle}
                onKeyDown={(e) => handleKeyClick(e, handleErrorToggle)}
              >
                <Icon icon={errorXIcon} font-size={"1vw"}/>
              </span>
            </p>
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
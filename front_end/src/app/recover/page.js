// import React, { useEffect } from 'react';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import styles from "../css/page.module.css";
import specificStyles from "../css/recover.module.css";
import Link from 'next/link';

console.log("this is the forgot password page");

// export default function Home() {
//   return (
//     <main className={styles.main}>
//       <div>
//       <main>
//         <div className="login">
//           <p>I'm sorry that you forgot your password :( </p>
//           <p>
//             Return to {" "}
//             <Link className={styles.a} href="/">
//               Login
//             </Link>
//           </p>
//         </div>
//       </main>
//       <footer>
//         <p>&copy; Innovation for Impact 2024</p>
//       </footer>
//     </div>
//     </main>
//   );
// }

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Function to validate email format
  const validateEmail = (email) => {
    // Use a regular expression to validate email format
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Handle submission logic here (not sure exactly what to do here yet --> send email to user etc)
    //Validate email format
    if(!validateEmail(email)){
      //Potential error message to the user: 
      return;
    }
    //send request to backend server (don't know how to handle this yet)
    try{
      // const response = await fetch(,{

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

  return (
    <main className={styles.main}>
      <h1 className={styles.header}>FORGOT PASSWORD?</h1>
      <div className={styles.iconText}>
        <Icon icon={mailOutline} size={24} />
        <p>Please provide the email address associated with your account and we will share a link to reset your password!</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className={`${styles.input} ${submitted && email.length === 0 && styles.error}`}
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <p className={styles.return}>
        Return to <Link href="/login"><u><b>Login</b></u></Link>
      </p>
    </main>
  );
}


// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <link rel="icon" type="image/x-icon" href="/images/icon.ico">
//   <link rel="stylesheet" href="css/html5reset.css">
//   <link rel="stylesheet" href="css/login.css">
//  <title>FinTech</title>	
// </head>	
// <body>
//    <main>
//     <div class="login">
//       <p>I'm sorry that you forgot your password :(</p>
//       <p>Return to <a href = "index.html">Log In</a> page</p>
//       </div>
//    </main>  

//    <footer>	
//     <p>&copy; Innovation for Impact 2024</p>	
//   </footer>	
  
// </body>
// </html>
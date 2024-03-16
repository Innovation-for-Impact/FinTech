// import React, { useEffect } from 'react';
import styles from "../css/page.module.css";
import specificStyles from "../css/recover.module.css";
import Link from 'next/link';

console.log("this is the forgot password page");

export default function Home() {
  // useEffect(() => {
  //   //this way the title remains FinTech as was in the HTML file
  //   document.title = 'FinTech';
  // }, []);
  return (
    <main className={styles.main}>
      <div>
      <main>
        <div className="login">
          <p>I'm sorry that you forgot your password :( </p>
          <p>
            Return to {" "}
            <Link className={styles.a} href="/">
              Login
            </Link>
          </p>
        </div>
      </main>
      <footer>
        <p>&copy; Innovation for Impact 2024</p>
      </footer>
    </div>
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
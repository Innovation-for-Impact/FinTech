import styles from "../css/page.module.css";
import signupStyles from "../css/signup.module.css";
import Link from 'next/link';

console.log("this is the sign up page"); 

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
      <main>
        <div className={styles.signup}>
        <div className={styles.empty}></div>


    <div className={styles.login}>
        <h1>Sign Up</h1>
        <div class={styles.form}>
            <form>
              <div class={signupStyles.inputBox}>
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" required></input>
              </div>
              <div class={signupStyles.inputBox}>
                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" required></input>
              </div>
        
              <div class={signupStyles.inputBox}>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required></input>
              </div>
              <div class={signupStyles.inputBox}>
                <label for="Password"> Password:</label>
                <input type="text" id = "Password" name = "Password" required></input>
              </div>
              <div class={signupStyles.inputBox}>
                <label for="confirmPassword">Confirm Password:</label>
                <input type="text" id = "confirmPassword" name = "confirmPassword" required></input>
              </div>
              <div class={signupStyles.checkbox}>
                <input type="checkbox" id="termsCheckbox" name="termsCheckbox" required></input>
                <label for="termsCheckbox">I agree to the Terms and Conditions</label>
              </div>
              <p>I agree to the terms and conditions</p>
              <button> SIGN UP </button>
              <p>Already have an account? <a href = "index.html"> Log In </a></p>
            </form>
          </div>
      </div>

    
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
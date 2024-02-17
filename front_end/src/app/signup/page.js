import styles from "../css/page.module.css";
import signupStyles from "../css/signup.module.css";
import Link from 'next/link';

export default function Home() {
  return (
  <main className={styles.main}>
    <div className={styles.login}>
      <img
          className={styles.img}
          src="/_next/static/media/icon_transparent.e1a2640c.png"
          alt="Grapefruit slice atop a pile of other slices" 
        />
      <div class={signupStyles.title}><h1>
        Sign Up
      </h1></div>
      <div class={styles.form}>
        <form>
        <div class={signupStyles.inputName}>
          <div class={signupStyles.inputBox1}>
            <label for="firstName">
              First Name
            </label>
            <input type="text" id="firstName" name="firstName" required></input>
          </div>
          <div class={signupStyles.inputBox2}>
            <label for="lastName">
              Last Name
            </label>
            <input type="text" id="lastName" name="lastName" required></input>
          </div>
          </div>

          <div class={signupStyles.inputInfo}>
          <div class={signupStyles.inputBox}>
            <label for="email">
              Email
            </label>
            <input type="email" id="email" name="email" required></input>
          </div>
          <div class={signupStyles.inputBox}>
            <label for="Password">
              Password
            </label>
            <input type="text" id = "Password" name = "Password" required></input>
          </div>
          <div class={signupStyles.inputBox}>
            <label for="confirmPassword">
              Confirm Password
            </label>
            <input type="text" id = "confirmPassword" name = "confirmPassword" required></input>
          </div>
          </div>

          <div class={signupStyles.checkbox}>
            <input type="checkbox" id="termsCheckbox" name="termsCheckbox" required></input>
            <label for="termsCheckbox">
            I agree to the Terms and Conditions
            </label>
          </div>
          <button> SIGN UP </button>
          <p>
            Already have an account? {" "}
            <Link className={styles.a} href="/">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>

    <footer>
      <p>&copy; Innovation for Impact 2024</p>
    </footer>
  </main>
  );
}
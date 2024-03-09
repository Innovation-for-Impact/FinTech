import styles from "../css/page.module.css";
import signupStyles from "../css/signup.module.css";
import Link from 'next/link';

export default function Home() {
  return (
  <main className={styles.main}>
    <div className={styles.signup}>
      <img
          className={styles.img}
          src="/_next/static/media/icon_transparent.e1a2640c.png"
          alt="Grapefruit slice atop a pile of other slices" 
        />
      <div className={signupStyles.title}><h1>
        Sign Up
      </h1></div>
      <div className={styles.form}>
        <form>
        <div className={signupStyles.inputName}>
          <div className={signupStyles.inputBox1}>
            <label htmlFor="firstName">
              First Name
            </label>
            <input type="text" id="firstName" name="firstName" required></input>
          </div>
          <div className={signupStyles.inputBox2}>
            <label htmlFor="lastName">
              Last Name
            </label>
            <input type="text" id="lastName" name="lastName" required></input>
          </div>
          </div>

          <div className={signupStyles.inputInfo}>
          <div className={signupStyles.inputBox}>
            <label htmlFor="email">
              Email
            </label>
            <input type="email" id="email" name="email" required></input>
          </div>
          <div className={signupStyles.inputBox}>
            <label htmlFor="Password">
              Password
            </label>
            <input type="text" id = "Password" name = "Password" required></input>
          </div>
          <div className={signupStyles.inputBox}>
            <label htmlFor="confirmPassword">
              Password Confirmation
            </label>
            <input type="text" id = "confirmPassword" name = "confirmPassword" required></input>
          </div>
          </div>

          <div className={signupStyles.checkbox}>
            <input type="checkbox" id="termsCheckbox" name="termsCheckbox" required></input>
            <label htmlFor="termsCheckbox">
            I agree to the {" "}
            <Link style={{ color: 'grey' }} href="https://maizepages.umich.edu/organization/innovationforimpact">
              Terms and Conditions
            </Link>
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
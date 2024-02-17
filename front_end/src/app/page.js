import Image from "next/image";
import styles from "../app/css/page.module.css";
import logo from '../app/images/icon_transparent.png';
import Link from 'next/link';

console.log(logo); // /logo.84287d09.png

export default function Home() {
  return (
    <main className={styles.main}>
    <div className={styles.login}>
      <img
        className={styles.img}
        src="/_next/static/media/icon_transparent.e1a2640c.png"
        alt="Grapefruit slice atop a pile of other slices" 
      />
      <div class={styles.title}>
      <h1>WELCOME BACK!</h1>
      </div>
        <div className={styles.info}>
          <label>
            <input 
              className={styles.input}
              type="text" 
              name="username" 
              placeholder="Username"></input>
          </label>
          <input 
            className={styles.input}
            type="password" 
            name="password" 
            placeholder="Password"></input>
          <p className={styles.forgot}>
            <Link href="/recover">
                Forgot Password?
            </Link>
          </p>
          <button> 
            LOGIN 
          </button>
          <p class={styles.noAccount}>
              Don't have an account?{" "}  
                <Link className={styles.a} href="/signup">
                  Sign Up
                </Link>
            </p>
        </div>
    </div>

    <footer>	
      <p>&copy; Innovation for Impact 2024</p>	
    </footer>	
  </main>
  );
}
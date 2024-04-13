"use client";
import styles from "../../../app/css/page.module.css";
import homeStyles from "../../../app/css/home.module.css";
import Link from 'next/link';
import React, { useState } from "react";
import {Icon} from 'react-icons-kit';
import { ic_menu } from 'react-icons-kit/md/ic_menu';
import { ic_close } from 'react-icons-kit/md/ic_close';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false); 
  };

  const handleIconClick = (e) => {
    e.stopPropagation(); 
    toggleMenu();
  };

  return (
    <main className={`${styles.homeMain} ${homeStyles.body}`} >
        <header className={styles.homeHeader}>
          {/* <a href = "#main"  className={homeStyles.skip}>Skip to Main Content</a> */}
          <div className={homeStyles.hamburger} onClick={handleIconClick}>
            {isOpen ? <Icon icon={ic_close} size={55} /> : <Icon icon={ic_menu} size={55} />}
          </div>
          <div className={homeStyles.homeContainer}>
              <div className={homeStyles.homeSubcontainer}>
                  <nav className={homeStyles.homeNavbar}>
                      {/* <a href="#" className={homeStyles.nav_branding}>Menu</a> */}
                      <ul className={`${homeStyles.nav_menu} ${isOpen ? homeStyles.open : ''}`}>
                          <Link className={homeStyles.nav_item} href = "calculator/.." onClick={handleLinkClick}>
                            <p>Home</p>
                          </Link>
                          <Link className={homeStyles.nav_item} href = "calculator/../goals" onClick={handleLinkClick}>
                            <p>Goals</p>
                          </Link>
                          <Link  className={`${homeStyles.nav_item} ${homeStyles.active}`} href = "calculator" onClick={handleLinkClick}>
                            <p>Calculator</p>
                          </Link>
                          <Link  className={homeStyles.nav_item} href = "calculator/../friends" onClick={handleLinkClick}>
                            <p>Friends</p>
                          </Link>
                          <Link  className={homeStyles.nav_item} href = "calculator/../profile" onClick={handleLinkClick}>
                            <p>Profile</p>
                          </Link>
                      </ul>
                      <img className={homeStyles.img}
                        src="/_next/static/media/icon_transparent.e1a2640c.png"
                        alt="Innovation for Impact Logos" 
                        width="4.5%"
                      />
                  </nav>
              </div>
          </div>
        </header>
      <div className={homeStyles.homePage}>
        <div class={styles.homeTitle}>
          <h1 style={{color:'#32415e'}}>
            Calculator
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <label>Income (After Tax):+</label><br/>
        <label>Work:</label>
        <input type="number" name="work" /><br/>"use client";

        <label>Part-Time:</label>
        <input type="number" name="Part-Time" /><br/><br/>

        <label>Savings:</label>
        <input type="number" name="Savings" /><br/><br/>

        <label>Expenses:+</label><br/>
        <label>Tuition:</label>
        <input type="number" name="Tuition" /><br/><br/>

        <label>Rent:</label>
        <input type="number" name="Rent" /><br/><br/>

        <label>Groceries:</label>
        <input type="number" name="Groceries" /><br/><br/>

        <label>Transportation:</label>
        <input type="number" name="Transportation" /><br/><br/>

        <label>Discretionary Spending:</label>
        <input type="number" name="DiscretionarySpending" /><br/><br/>

        <input type="submit" value="Submit" />
      </form>
    </main>
  );
}
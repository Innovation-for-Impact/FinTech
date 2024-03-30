"use client";
import styles from "../../app/css/page.module.css";
import homeStyles from "../css/home.module.css";
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
    setIsOpen(false); // Close the menu when a link is clicked
  };

  const handleIconClick = (e) => {
    e.stopPropagation(); // Prevent event propagation to parent elements
    toggleMenu(); // Toggle the menu
  };

  return (
    <main className={`${styles.homeMain} ${homeStyles.body}`} >
        <header className={styles.homeHeader}>
          {/* <a href = "#main"  className={homeStyles.skip}>Skip to Main Content</a> */}
          <div className={homeStyles.homeContainer}>
              <div className={homeStyles.homeSubcontainer}>
                  <nav className={homeStyles.homeNavbar}>
                      {/* <a href="#" className={homeStyles.nav_branding}>Menu</a> */}
                    <div className={homeStyles.hamburger} onClick={handleIconClick}>
                      {isOpen ? <Icon icon={ic_close} size={55} /> : <Icon icon={ic_menu} size={55} />}
                    </div>
                    <ul className={`${homeStyles.nav_menu} ${isOpen ? homeStyles.open : ''}`}>
                          <Link className={`${homeStyles.nav_item} ${homeStyles.active}`} href = "home" onClick={handleLinkClick}>
                            <p>Home</p>
                          </Link>
                          <Link className={homeStyles.nav_item} href = "home/goals" onClick={handleLinkClick}>
                            <p>Goals</p>
                          </Link>
                          <Link  className={homeStyles.nav_item} href = "home/calculator" onClick={handleLinkClick}>
                            <p>Calculator</p>
                          </Link>
                          <Link  className={homeStyles.nav_item} href = "home/friends" onClick={handleLinkClick}>
                            <p>Friends</p>
                          </Link>
                          <Link  className={homeStyles.nav_item} href = "home/profile" onClick={handleLinkClick}>
                            <p>Profile</p>
                          </Link>
                      </ul>
                      <img className={homeStyles.img}
                        src="/_next/static/media/icon_transparent.e1a2640c.png"
                        alt="Innovation for Impact Logos" 
                        width="5.5%"
                      />
                  </nav>
              </div>
          </div>
        </header>
      <div className={homeStyles.homePage}>
        <div class={styles.homeTitle}>
          <h1 style={{color:'#32415e'}}>
            HOME PAGE!
          </h1>
        </div>
      </div>
  </main>
  );
}
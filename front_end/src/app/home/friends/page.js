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

  // MENU functions
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
  // end MENU functions

  return (
    <main className={`${styles.homeMain} ${homeStyles.body}`} >
        
        {/* display menu (hamburger menu for mobile/tablet) */}
        <header className={styles.homeHeader}>
          {/* <a href = "#main"  className={homeStyles.skip}>Skip to Main Content</a> */}
          <div className={homeStyles.hamburger} onClick={handleIconClick}>
            {isOpen ? <Icon icon={ic_close} size={55} /> : <Icon icon={ic_menu} size={55} />}
          </div>

          {/* display navigation links */}
          <div className={homeStyles.homeContainer}>
          <div className={homeStyles.homeSubcontainer}>
            <nav className={homeStyles.homeNavbar}>
              {/* <a href="#" className={homeStyles.nav_branding}>Menu</a> */}
              <ul className={`${homeStyles.nav_menu} ${isOpen ? homeStyles.open : ''}`}>
                <li>
                  <Link className={homeStyles.nav_item} href = "friends/.." onClick={handleLinkClick}>
                    <p>Home</p>
                  </Link>
                </li>
                <li>
                  <Link className={homeStyles.nav_item} href = "friends/../goals" onClick={handleLinkClick}>
                    <p>Goals</p>
                  </Link>
                </li>
                <li>
                  <Link className={homeStyles.nav_item} href = "friends/../calculator" onClick={handleLinkClick}>
                    <p>Calculator</p>
                  </Link>
                </li>
                <li>
                  <Link className={`${homeStyles.nav_item} ${homeStyles.active}`} href = "friends" onClick={handleLinkClick}>
                    <p>Friends</p>
                  </Link>
                </li>
                <li>
                  <Link className={homeStyles.nav_item} href = "friends/../profile" onClick={handleLinkClick}>
                    <p>Profile</p>
                  </Link>
                </li>
              </ul>

              {/* display IFI logo */}
              <img className={homeStyles.img}
                src="/_next/static/media/icon_transparent.e1a2640c.png"
                alt="Innovation for Impact logo" 
                width="4.5%"
              />
            </nav>
          </div>
          </div>
        </header>

      {/* header for current page */}
      <div className={homeStyles.homePage}>
        <div class={styles.homeTitle}>
          <h1 style={{color:'#32415e'}}>
            Friends
          </h1>
        </div>
      </div>

    {/* TODO: add page content here */}

  </main>
  );
}
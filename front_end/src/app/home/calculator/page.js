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
                    <Link className={homeStyles.nav_item} href = "profile/.." onClick={handleLinkClick}>
                      <p>Home</p>
                    </Link>
                  </li>
                  <li>
                    <Link className={homeStyles.nav_item} href = "profile/../goals" onClick={handleLinkClick}>
                      <p>Goals</p>
                    </Link>
                  </li>
                  <li>
                    <Link className={`${homeStyles.nav_item} ${homeStyles.active}`} href = "profile/../calculator" onClick={handleLinkClick}>
                      <p>Calculator</p>
                    </Link>
                  </li>
                  <li>
                    <Link className={homeStyles.nav_item} href = "profile/../friends" onClick={handleLinkClick}>
                      <p>Friends</p>
                    </Link>
                  </li>
                  <li>
                    <Link className={homeStyles.nav_item} href = "profile" onClick={handleLinkClick}>
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
            Calculator
          </h1>
        </div>
      </div>

      {/* TODO Chiho: add form here
          
          advice from Julia
          - create a form like line 88 (<form onSubmit...) of the login page

          - pay careful attention to how varaibles are declared (use ctrl + f to explore this)
          
          - pay attention to how things are 'sandwiched' in the html (ie. the <form> tag will be like the bun, each individual input will be like a hamburger topping) 

          - if you have HTML quesitons in general, check out w3schools.com (look up "w3schools input" or "w3schools form" and it will take you to a great page)

          - don't worry about how the styling looks (ie. colors, cute boxes, etc.) - just get the boxes to show up

          - send me a screenshot of your code with literally (and I really mean that) ANY question

          - when you want to make a comment, do "command + /" on Mac or "ctrl + /" on Windows
      
      */}


  </main>
  );
}
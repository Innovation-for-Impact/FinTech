"use client";
import styles from "../../app/css/page.module.css";
import homeStyles from "../css/home.module.css";
import Link from 'next/link';
import React, { useState } from "react";
import {Icon} from 'react-icons-kit';
import { ic_menu } from 'react-icons-kit/md/ic_menu';
import { ic_close } from 'react-icons-kit/md/ic_close';
import Image from 'next/image';
import logo from '../../../public/innofunds-logo-transparent.png';
import { Navbar, Nav, Button, ModalFooter } from 'react-bootstrap';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  // MENU functions 
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

  // end MENU functions

  const handleLogout = (e) => {
    e.preventDefault();
  
    fetch('http://localhost:8000/api/v1/auth/logout/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      if (data.detail === 'Successfully logged out.') {
        // successfully logged out
        localStorage.removeItem('access'); 
        window.location.href = '/'; 
      } else {
        // error messages
        setErrorMessage("Failed to log out");
      }
    })
    .catch(error => {
      console.error("Logout error:", error);
    });
  };

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
              <Navbar className={homeStyles.homeNavbar}>
                <Navbar.Brand>
                  {/* display logo */}
                  <Image 
                    className={homeStyles.img}
                    src={logo}
                    alt="Innofunds Logo"
                    layout="intrinsic"
                  />
                </Navbar.Brand>
                <ul className={`${homeStyles.nav_menu} ${isOpen ? homeStyles.open : ''}`}>
                  <li>
                    <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background} ${homeStyles.active}`} href="home">Home</Nav.Link>
                  </li>
                  <li>
                    <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background}`} href="home/goals">Goals</Nav.Link>
                  </li>
                  <li>
                    <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background}`} href="home/calculator">Calculator</Nav.Link>
                  </li>
                  <li>
                    <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background}`} href="home/friends">Friends</Nav.Link>
                  </li>
                  <li>
                    <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background}`} href="home/profile">Profile</Nav.Link>
                  </li>
                  <li>
                    {/* LOG OUT */}
                    <Button className={`${homeStyles.button_style} ${homeStyles.link_background}`} variant="primary" type="submit" onClick={handleLogout}> 
                      Log Out 
                    </Button>
                  </li>
                </ul>
              </Navbar>
          </div>
        </div>
      </header>

    {/* header for current page */}
    <div className={homeStyles.homePage}>
      <div className={styles.homeTitle}>
      <h1>Home</h1>
      </div>
    </div>

    {/* TODO: add page content here */}
    <div className={homeStyles.content}>
    <div className={homeStyles.balanceHeader}>
      
      <h2>Balance Owed</h2>
      <p>$ 30.00</p>
      <h3>Payment Due By: </h3>
      <button>Pay or Request</button>
    </div>

    <div className={homeStyles.latestFromUs}>
      <h1>Latest From Us</h1>
      <div className={homeStyles.newFeature}>
        <h3>Save More With Our New Feature</h3>
        <button>Check it out!</button>
      </div>

      <div className={homeStyles.bigStat}>
        <h3>Big Statistic</h3>
        <button>See Targets</button>
      </div>

      <div className={homeStyles.upcomingFeature}>
        <h3>Another cool feature is on the way!</h3>
        <button>Learn More</button>
      </div>
    </div>
    {/* latest from us ends */}
    <div className={homeStyles.quickActions}>
      <h1>Quick Actions</h1>
      <div className={homeStyles.inviteFriends}>
        <h3>Invite your friends</h3>
        <p>Share milestones and keep up with the community.</p>
        <button>Get Connected</button>
      </div>

      <div className={homeStyles.calculator}>
        <h3>Track Your Finances</h3>
        <p>our Calculator feature can help you plan your budget.</p>
        <button>Calculate</button>
      </div>

      <div className={homeStyles.newQuickAction}>
        <h3>Add a new Quick Action</h3>
        <button>Click Here</button>
      </div>

    </div>
    </div>
    <ModalFooter className={homeStyles.footer}>
      <h1 className={homeStyles.footer_text} >InnoFunds</h1>
    </ModalFooter>
    
  </main>
  );
}
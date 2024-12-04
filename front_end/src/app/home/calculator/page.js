"use client";
import styles from "../../../app/css/page.module.css";
import homeStyles from "../../../app/css/home.module.css";
import calculatorStyles from "../../../app/css/calculator.module.css";
import Link from 'next/link';
import React, { useState } from "react";
import {Icon} from 'react-icons-kit';
import { ic_menu } from 'react-icons-kit/md/ic_menu';
import { ic_close } from 'react-icons-kit/md/ic_close';
import Image from 'next/image';
import logo from '../../../../public/innofunds-logo-transparent.png';
import { Navbar, Nav, Button, ModalFooter } from 'react-bootstrap';

export default function Calculator() {
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

  const handleLogout = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/v1/auth/logout/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.detail === 'Successfully logged out.') {
        localStorage.removeItem('access'); 
        window.location.href = '/'; 
      }
    })
    .catch(error => {
      console.error("Logout error:", error);
    });
  };

  return (
    <main className={`${styles.homeMain} ${homeStyles.body}`}>
      <header className={styles.homeHeader}>
        <div className={homeStyles.hamburger} onClick={handleIconClick}>
          {isOpen ? <Icon icon={ic_close} size={55} /> : <Icon icon={ic_menu} size={55} />}
        </div>

        <div className={homeStyles.homeContainer}>
          <div className={homeStyles.homeSubcontainer}>
            <Navbar className={homeStyles.homeNavbar}>
              <Navbar.Brand>
                <Image 
                  className={homeStyles.img}
                  src={logo}
                  alt="Innofunds Logo"
                  layout="intrinsic"
                />
              </Navbar.Brand>
              <ul className={`${homeStyles.nav_menu} ${isOpen ? homeStyles.open : ''}`}>
                <li>
                  <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background}`} href="calculator/..">Home</Nav.Link>
                </li>
                <li>
                  <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background}`} href="calculator/../goals">Goals</Nav.Link>
                </li>
                <li>
                  <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background} ${homeStyles.active}`} href="calculator">Calculator</Nav.Link>
                </li>
                <li>
                  <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background}`} href="calculator/../friends">Friends</Nav.Link>
                </li>
                <li>
                  <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background}`} href="calculator/../profile">Profile</Nav.Link>
                </li>
                <li>
                  <Button className={`${homeStyles.button_style} ${homeStyles.link_background}`} variant="primary" type="submit" onClick={handleLogout}> 
                    Log Out 
                  </Button>
                </li>
              </ul>
            </Navbar>
          </div>
        </div>
      </header>

      <div className={calculatorStyles.calculatorContainer}>
  <h2 className={calculatorStyles.groupsTitle}>Groups</h2>

  
  {/* First card - Dark blue */}
  <div className={calculatorStyles.groupCard}>
    <div className={calculatorStyles.groupTitle}>
      Innovation for Impact Trip
    </div>
    <div className={calculatorStyles.groupInfo}>
      <div>
        <div className={calculatorStyles.currentAmount}>Goal:</div>
        <div className={calculatorStyles.goalAmount}>$1000.00</div>
        <div className={calculatorStyles.currentAmount}>Current Balance:</div>
        <div className={calculatorStyles.currentAmount}>$870.65</div>
      </div>
    </div>
    <div className={calculatorStyles.progressBar}>
      <div 
        className={calculatorStyles.progressFill} 
        style={{width: '87%'}}
      />
    </div>
    <div className={calculatorStyles.dateInfo}>
      May 15, 2025
    </div>
  </div>

  {/* Second card - Blue-gray */}
  <div className={calculatorStyles.groupCard}>
    <div className={calculatorStyles.groupTitle}>
      Name / Title
    </div>
    <div className={calculatorStyles.groupInfo}>
      <div>
        <div className={calculatorStyles.goalAmount}>$Goal Amount</div>
        <div className={calculatorStyles.currentAmount}>$Current Amount</div>
      </div>
    </div>
    <div className={calculatorStyles.progressBar}>
      <div 
        className={calculatorStyles.progressFill} 
        style={{width: '0%'}}
      />
    </div>
    <div className={calculatorStyles.dateInfo}>
      Month XX, 20XX
    </div>
  </div>

  {/* Third card - Sage green */}
  <div className={calculatorStyles.groupCard}>
    <div className={calculatorStyles.groupTitle}>
      Name / Title
    </div>
    <div className={calculatorStyles.groupInfo}>
      <div>
        <div className={calculatorStyles.goalAmount}>$Goal Amount</div>
        <div className={calculatorStyles.currentAmount}>$Current Amount</div>
      </div>
    </div>
    <div className={calculatorStyles.progressBar}>
      <div 
        className={calculatorStyles.progressFill} 
        style={{width: '0%'}}
      />
    </div>
    <div className={calculatorStyles.dateInfo}>
      Month XX, 20XX
    </div>
  </div>

  <button className={calculatorStyles.addGroupButton}>
    Add Group
  </button>
</div>
      <ModalFooter className={homeStyles.footer}>
        <h1 className={homeStyles.footer_text}>InnoFunds</h1>
      </ModalFooter>
    </main>
  );
}
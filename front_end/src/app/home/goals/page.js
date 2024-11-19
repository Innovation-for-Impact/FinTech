"use client";
import styles from "../../../app/css/page.module.css";
import homeStyles from "../../../app/css/home.module.css";
import Link from 'next/link';
import React, { useState } from "react";
import {Icon} from 'react-icons-kit';
import { ic_menu } from 'react-icons-kit/md/ic_menu';
import { ic_close } from 'react-icons-kit/md/ic_close';
import Image from 'next/image';
import logo from '../../../../public/innofunds-logo-transparent.png';
import { Navbar, Nav, Button, ModalFooter} from 'react-bootstrap';

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
                    <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background}`} href="goals/..">Home</Nav.Link>
                  </li>
                  <li>
                    <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background} ${homeStyles.active}`} href="goals">Goals</Nav.Link>
                  </li>
                  <li>
                    <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background}`} href="goals/../calculator">Calculator</Nav.Link>
                  </li>
                  <li>
                    <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background}`} href="goals/../friends">Friends</Nav.Link>
                  </li>
                  <li>
                    <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background}`} href="goals/../profile">Profile</Nav.Link>
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
        <div class={styles.homeTitle}>
          <h1 style={{color:'#32415e'}}>
            Goals
          </h1>
        </div>
      </div>

      {/* TODO: add page content here */}
      <div className={homeStyles.dashBoard}>
      <div className={homeStyles.square_box}>
            <h2>Spending</h2>
            <p>This Month’s Current Spending</p>
            <h3>$4,500</h3>
            <div class="line-chart"></div>
        </div>
         <div class="square_box">
            <h2>Income</h2>
            <ul>
                <li>Net Worth: <span>$78,000</span></li>
                <li>Net Cash: <span>$18,000</span></li>
                <li>Income This Month: <span>$5,000</span></li>
                <li>Savings: <span>$3,000</span></li>
            </ul>
        </div> {/* spending section*/}
        <div className={homeStyles.budget_tracker}>
        <h2>Budget Tracker <span>Total Expenses</span></h2>
        <div class="expense-item">
            <div class="icon">👤</div>
            <div class="expense-info">
                <strong>Food</strong>
                <p>Transaction Notes</p>
            </div>
            <div class="expense-amount">
                -$15.00 <span>of $100</span>
            </div>
        </div>
        <div class="expense-item">
            <div class="icon">👤</div>
            <div class="expense-info">
                <strong>Bills</strong>
                <p>Transaction Notes</p>
            </div>
            <div class="expense-amount">
                -$50.00 <span>of $63</span>
            </div>
        </div>
        <div class="expense-item">
            <div class="icon">👤</div>
            <div class="expense-info">
                <strong>Transportation</strong>
                <p>Transaction Notes</p>
            </div>
            <div class="expense-amount">
                -$70.20 <span>of $200</span>
            </div>
        </div>
        </div>
        </div> {/* entire dashboard section */}

      <ModalFooter className={homeStyles.footer}>
      <h1 className={homeStyles.footer_text} >InnoFunds</h1>
      </ModalFooter>
  </main>
  );
}
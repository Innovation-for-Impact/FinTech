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
                  <Link className={homeStyles.nav_item} href = "goals/..">
                    <p>Home</p>
                  </Link>
                </li>
                <li>
                  <Link className={`${homeStyles.nav_item} ${homeStyles.active}`} href = "goals" onClick={handleLinkClick}>
                    <p>Goals</p>
                  </Link>
                </li>
                <li>
                  <Link className={homeStyles.nav_item} href = "goals/../calculator" onClick={handleLinkClick}>
                    <p>Calculator</p>
                  </Link>
                </li>
                <li>
                  <Link className={homeStyles.nav_item} href = "goals/../friends" onClick={handleLinkClick}>
                    <p>Friends</p>
                  </Link>
                </li>
                <li>
                  <Link className={homeStyles.nav_item} href = "goals/../profile" onClick={handleLinkClick}>
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

  </main>
  );
}
"use client";
import styles from "../../../app/css/page.module.css";
import homeStyles from "../../../app/css/home.module.css";
import friendStyles from "../../../app/css/friends.module.css";
import Link from 'next/link';
import React, { useState } from "react";
import Icon from 'react-icons-kit';
import { ic_menu } from 'react-icons-kit/md/ic_menu';
import { ic_close } from 'react-icons-kit/md/ic_close';
import { ic_search } from 'react-icons-kit/md/ic_search';
import { ic_person } from 'react-icons-kit/md/ic_person';
import Image from 'next/image';
import logo from '../../../../public/innofunds-logo-transparent.png';
import { Navbar, Nav, Button, ModalFooter } from 'react-bootstrap';

export default function Friends() {
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

  const activityData = [
    {
      user: "Regan",
      action: "saved",
      amount: "$25",
      target: "Julia's Trip to Cabo",
      trend: "up"
    },
    {
      user: "Julia",
      message: "did not meet monthly savings goal for June. Send a message of support!"
    },
    {
      user: "Regan",
      action: "saved",
      amount: "$25",
      target: "Julia's Trip to Cabo",
      trend: "up"
    },
    {
      user: "Prabhleen",
      message: "just joined FinTech!"
    }
  ];

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
                    <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background}`} href="friends/..">Home</Nav.Link>
                  </li>
                  <li>
                    <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background}`} href="friends/../goals">Goals</Nav.Link>
                  </li>
                  <li>
                    <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background} ${homeStyles.active}`} href="friends/../calculator">Calculator</Nav.Link>
                  </li>
                  <li>
                    <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background}`} href="friends">Friends</Nav.Link>
                  </li>
                  <li>
                    <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background}`} href="friends/../profile">Profile</Nav.Link>
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
      {/* <div className={homeStyles.homePage}>
        <div class={styles.homeTitle}>
          <h1 style={{color:'#32415e'}}>
            Friends
          </h1>
        </div>
      </div> */}

      <div className={friendStyles.pageContainer}>
        <div className={friendStyles.activitySection}>
          <div className={friendStyles["dot-top-left"]}></div>
          <div className={friendStyles["dot-top-right"]}></div>
          <div className={friendStyles["dot-bottom-left"]}></div>
          <div className={friendStyles["dot-bottom-right"]}></div>
          
          <h2 className={friendStyles.sectionTitle}>Your Friends</h2>
          
          {activityData.map((activity, index) => (
            <div key={index} className={friendStyles.activityCard}>
              <div className={friendStyles.avatarWrapper}>
                <Image 
                  src="/default-avatar.png"
                  alt={`${activity.user}'s avatar`}
                  width={40}
                  height={40}
                  className={friendStyles.userAvatar}
                />
              </div>
              <div className={friendStyles.activityContent}>
                {activity.action ? (
                  <p>
                    <strong>{activity.user}</strong> {activity.action} {activity.amount} towards {activity.target} 
                    {activity.trend === 'up' && ' ↑'}
                  </p>
                ) : (
                  <p><strong>{activity.user}</strong> {activity.message}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <br></br>
        <br></br>

        <div className={friendStyles.actionBar}>
          <button className={friendStyles.payRequestButton}>
            Pay or Request
          </button>
          <div className={friendStyles.searchWrapper}>
            <input 
              type="search" 
              placeholder="Search" 
              className={friendStyles.searchInput}
            />
            <Icon icon={ic_search} size={20} className={friendStyles.searchIcon} />
          </div>
        </div>

        <div className={friendStyles.friendsGrid}>
          {[...Array(12)].map((_, index) => (
            <div 
              key={index} 
              className={`${friendStyles.friendCard} ${
                index % 3 === 0 ? friendStyles.colorVariant1 : 
                index % 3 === 1 ? friendStyles.colorVariant2 : 
                friendStyles.colorVariant3
              }`}
            >
              <div className={friendStyles.friendInfo}>
                <div className={friendStyles.avatarCircle}>
                  <Icon icon={ic_person} size={24} className={friendStyles.personIcon} />
                </div>
                <div className={friendStyles.nameInfo}>
                  <h3>Name</h3>
                  <p>Username</p>
                </div>
              </div>
              <button className={friendStyles.viewButton}>
                View
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className={friendStyles.parentContainer}>
  <button className={friendStyles.addFriendsButton}>Add Friends</button>
</div>
  

<ModalFooter className={homeStyles.footer}>
      <h1 className={homeStyles.footer_text} >InnoFunds</h1>
    </ModalFooter>
    </main>
  );
}


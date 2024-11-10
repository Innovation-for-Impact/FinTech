"use client";
import styles from "../../../app/css/page.module.css";
import homeStyles from "../../../app/css/home.module.css";
import profileStyles from "../../../app/css/profile.module.css";
import Link from 'next/link';
import React, { useState } from "react";
import {Icon} from 'react-icons-kit';
import { ic_menu } from 'react-icons-kit/md/ic_menu';
import { ic_close } from 'react-icons-kit/md/ic_close';
import Image_logo from 'next/image';
import logo from '../../../../public/innofunds-logo-transparent.png';
import { Navbar, Nav, Button, ModalFooter } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'; 
import { FaCircleUser } from "react-icons/fa6";

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
                  <Image_logo 
                    className={homeStyles.img}
                    src={logo}
                    alt="Innofunds Logo"
                    layout="intrinsic"
                  />
                </Navbar.Brand>
                <ul className={`${homeStyles.nav_menu} ${isOpen ? homeStyles.open : ''}`}>
                  <li>
                    <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background}`} href="profile/..">Home</Nav.Link>
                  </li>
                  <li>
                    <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background}`} href="profile/../goals">Goals</Nav.Link>
                  </li>
                  <li>
                    <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background}`} href="profile/../calculator">Calculator</Nav.Link>
                  </li>
                  <li>
                    <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background}`} href="profile/../friends">Friends</Nav.Link>
                  </li>
                  <li>
                    <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background} ${homeStyles.active}`} href="profile">Profile</Nav.Link>
                  </li>
                  <li>
                    {/* LOG OUT */}
                    <Button className={`${homeStyles.button_style} ${homeStyles.link_background}`} variant="primary" type="submit"> 
                      Log Out 
                    </Button>
                  </li>
                </ul>
              </Navbar>
          </div>
        </div>
        </header>

        {/* contents of profile page */}
        <div className={homeStyles.homePage}>

          {/* profile icon */}
          <FaCircleUser className={profileStyles.profile_icon} color="#BDCFCC" />
          {/* <Image src="" rounded /> */}

          <p className={profileStyles.name}>Name</p>
          <p className={profileStyles.pronouns}>Pronouns</p>

          <Button>
            Groups
          </Button>
          <Button>
            Friends
          </Button>
        </div>

        {/* TODO: add page content here */}
        
        <ModalFooter className={homeStyles.footer}>
          <h1 className={homeStyles.footer_text} >InnoFunds</h1>
        </ModalFooter>
  </main>
  );
}
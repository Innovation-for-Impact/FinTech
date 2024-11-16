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
  const [legal_name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address_city, setCity] = useState('');
  const [address_country, setCountry] = useState('');
  const [address_postal, setPostal] = useState('');
  const [address_region, setRegion] = useState('');
  const [address_street, setStreet] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      legal_name: legal_name,
      email: email,
      address_city: address_city,
      address_country: address_country,
      address_postal: address_postal,
      address_region: address_region,
      address_street: address_street,
    };
    try {
      const response = await fetch(localhost, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setSubmitted(true);
        // Clear form inputs
        setName('');
        setEmail('');
        setCity('');
        setCountry('');
        setPostal('');
        setRegion('');
        setStreet('');
      } else {
        // Handle error
        console.error('Failed to submit form');
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error);
    }
  };

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

          <Button className={`${profileStyles.groups_button}`} variant="primary" type="submit" onClick={() => { window.location.href = 'profile/../calculator'; }}>
            Groups 
          </Button> 
          <Button className={`${profileStyles.friends_button}`} variant="primary" type="submit" onClick={() => { window.location.href = 'profile/../friends'; }}>
            Friends
          </Button>
        </div>

        {/* TODO: add page content here */}
        {/* <form onSubmit={handleFormSubmit}>
          <div className={styles.info}>
            <input
              className={`${styles.input} ${submitted && styles.error}`}
              placeholder="Legal Name"
              name="name"
              value={legal_name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className={`${styles.input} ${submitted && styles.error}`}
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={`${styles.input} ${submitted && styles.error}`}
              placeholder="City"
              name="city"
              value={address_city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              className={`${styles.input} ${submitted && styles.error}`}
              placeholder="Country"
              name="country"
              value={address_country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <input
              className={`${styles.input} ${submitted && styles.error}`}
              placeholder="Postal Code"
              name="zip"
              value={address_postal}
              onChange={(e) => setPostal(e.target.value)}
            />
            <input
              className={`${styles.input} ${submitted && styles.error}`}
              placeholder="State or Region"
              name="state"
              value={address_region}
              onChange={(e) => setRegion(e.target.value)}
            />
            <input
              className={`${styles.input} ${submitted && styles.error}`}
              placeholder="Street Address"
              name="street"
              value={address_street}
              onChange={(e) => setStreet(e.target.value)}
            />
            <button>CONFIRM</button>
          </div>
        </form> */}
        
        <ModalFooter className={homeStyles.footer}>
          <h1 className={homeStyles.footer_text} >InnoFunds</h1>
        </ModalFooter>
  </main>
  );
}





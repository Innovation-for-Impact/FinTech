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
  const [legal_name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address_city, setCity] = useState('');
  const [address_country, setCountry] = useState('');
  const [address_postal, setPostal] = useState('');
  const [address_region, setRegion] = useState('');
  const [address_street, setStreet] = useState('');
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  } // handleSubmit

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
              <Link className={homeStyles.nav_item} href = "profile/.." onClick={handleLinkClick}>
                <p>Home</p>
              </Link>
              <Link className={homeStyles.nav_item} href = "profile/../goals" onClick={handleLinkClick}>
                <p>Goals</p>
              </Link>
              <Link className={homeStyles.nav_item} href = "profile/../calculator" onClick={handleLinkClick}>
                <p>Calculator</p>
              </Link>
              <Link className={homeStyles.nav_item} href = "profile/../friends" onClick={handleLinkClick}>
                <p>Friends</p>
              </Link>
              <Link className={`${homeStyles.nav_item} ${homeStyles.active}`} href = "profile" onClick={handleLinkClick}>
                <p>Profile</p>
              </Link>
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
            Profile
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
      <div className={styles.info}>
        {/* accept LEGAL NAME */}
        <input 
          className= {`${styles.input} ${submitted && styles.error}`}
          placeholder="Legal Name" // placeholder word (ie. shows up in gray-ed out font)
          name="name"  // allow auto-fill
          value={legal_name} // save input to variable
          onChange={(e) => setName(e.target.value)}
        />

        {/* accept EMAIL ADDRESS */}
        <input 
          className= {`${styles.input} ${submitted && styles.error}`}
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* accept ADDRESS CITY */}
        <input 
          className= {`${styles.input} ${submitted && styles.error}`}
          placeholder="City"
          name="city"
          value={address_city}
          onChange={(e) => setCity(e.target.value)}
        />

        {/* accept ADDRESS COUNTRY */}
        <input 
          className= {`${styles.input} ${submitted && styles.error}`}
          placeholder="Country"
          name="country"
          value={address_country}
          onChange={(e) => setCountry(e.target.value)}
        />

        {/* accept ADDRESS POSTAL */}
        <input 
          className= {`${styles.input} ${submitted && styles.error}`}
          placeholder="Postal Code"
          name="zip"
          value={address_postal}
          onChange={(e) => setPostal(e.target.value)}
        />

        {/* accept ADDRESS REGION */}
        <input 
          className= {`${styles.input} ${submitted && styles.error}`}
          placeholder="State or Region"
          name="state"
          value={address_region}
          onChange={(e) => setRegion(e.target.value)}
        />

        {/* accept ADDRESS STREET */}
        <input 
          className= {`${styles.input} ${submitted && styles.error}`}
          placeholder="Street Address"
          name="street"
          value={address_street}
          onChange={(e) => setStreet(e.target.value)}
        />

        {/* allow user to submit the form */}
        <button> 
            CONFIRM
        </button>
      </div>
    </form>

  </main>
  );
}